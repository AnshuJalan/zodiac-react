import smartpy as sp

# The contract managing the XTZ & shares flow.

class Position:
    Long = 0
    Short = 1

class Types:
    #quantity has granularity- 10
    orderType = sp.TMap(sp.TInt, sp.TRecord(position = sp.TInt, creator = sp.TAddress, priceBuy = sp.TNat, price = sp.TNat, quantity = sp.TNat)) 
    buyAndSellType = sp.TMap(sp.TInt, sp.TBool)
    sharesType = sp.TMap(sp.TAddress, sp.TMap(sp.TNat, sp.TInt))

class Market(sp.Contract):
    def __init__(self):
        self.init_type(sp.TRecord(
        admin = sp.TPair(sp.TAddress, sp.TAddress),
        infoIPFS = sp.TString,
        uuid = sp.TInt,
        endTime = sp.TTimestamp,
        result = sp.TOption(sp.TInt),
        orders = Types.orderType,
        buyLongOrders = Types.buyAndSellType,
        buyShortOrders = Types.buyAndSellType,
        sellLongOrders = Types.buyAndSellType,
        sellShortOrders = Types.buyAndSellType,
        sharesLong = Types.sharesType,
        sharesShort = Types.sharesType 
    ))
    
    @sp.entry_point
    def buyShort(self, params):
        sp.set_type(params, sp.TRecord(quantity = sp.TNat, price = sp.TNat))
        sp.verify(~self.data.result.is_some())
        self.verifyPrice(params, sp.amount)
        
        matchPrice = 1000000 - params.price
        confirmed = sp.local('confirmed', False)
        index = sp.local('index', -1)
        sp.for i in self.data.buyLongOrders.keys():
            order = self.data.orders[i]
            sp.if ~confirmed.value & (order.price == sp.as_nat(matchPrice)) & (order.quantity == params.quantity) & ~(order.creator == sp.sender):
                confirmed.value = True
                index.value = i
                self.addShares(sp.record(sender = sp.sender, position = Position.Short, price = params.price, quantity = params.quantity))
                self.addShares(sp.record(sender = order.creator, position = Position.Long, price = sp.as_nat(matchPrice), quantity = order.quantity))
                
        sp.if confirmed.value:
            del self.data.orders[index.value]
            del self.data.buyLongOrders[index.value]
        sp.else:
            self.data.uuid += 1
            self.data.buyShortOrders[self.data.uuid] = True
            self.data.orders[self.data.uuid] = sp.record(position = Position.Short, creator = sp.sender, price = params.price, priceBuy = 0, quantity = params.quantity)

    @sp.entry_point
    def buyLong(self, params):
        sp.set_type(params, sp.TRecord(quantity = sp.TNat, price = sp.TNat))
        sp.verify(~self.data.result.is_some())
        self.verifyPrice(params, sp.amount)
        
        matchPrice = 1000000 - params.price
        confirmed = sp.local('confirmed', False)
        index = sp.local('index', -1)
        sp.for i in self.data.buyShortOrders.keys():
            order = self.data.orders[i]
            sp.if ~confirmed.value & (order.price == sp.as_nat(matchPrice)) & (order.quantity == params.quantity) & ~(order.creator == sp.sender):
                confirmed.value = True
                index.value = i
                self.addShares(sp.record(sender = sp.sender, position = Position.Long, price = params.price, quantity = params.quantity))
                self.addShares(sp.record(sender = order.creator, position = Position.Short, price = sp.as_nat(matchPrice), quantity = order.quantity))
                
        sp.if confirmed.value:
            del self.data.orders[index.value]
            del self.data.buyShortOrders[index.value]
        sp.else:
            self.data.uuid += 1
            self.data.buyLongOrders[self.data.uuid] = True
            self.data.orders[self.data.uuid] = sp.record(position = Position.Long, creator = sp.sender, priceBuy = 0, price = params.price, quantity = params.quantity)
    
    
    @sp.entry_point
    def sellShort(self, params):
        sp.set_type(params, sp.TRecord(quantity = sp.TNat, price_buy = sp.TNat, price_sell = sp.TNat))
        sp.verify(~self.data.result.is_some())
        sp.verify(self.data.sharesShort[sp.sender][params.price_buy] >= sp.to_int(params.quantity))
        sp.verify(params.price_sell <= 1000000)
        
        matchPrice = 1000000 - params.price_sell
        confirmed = sp.local('confirmed', False)
        index = sp.local('index', -1)
        sp.for i in self.data.sellLongOrders.keys():
            order = self.data.orders[i]
            sp.if ~confirmed.value & (order.price == sp.as_nat(matchPrice)) & (order.quantity == params.quantity) & ~(order.creator == sp.sender):
                    confirmed.value = True
                    index.value = i
        
        sp.if confirmed.value:
            order = self.data.orders[index.value]
            sp.send(order.creator, sp.mutez((order.price * order.quantity) // 10))
            sp.send(sp.sender, sp.mutez((params.price_sell * params.quantity) // 10))
            self.data.sharesLong[order.creator][order.price] -= sp.to_int(order.quantity)
            self.data.sharesShort[sp.sender][params.price_buy] -= sp.to_int(params.quantity)
            del self.data.orders[index.value]
            del self.data.sellLongOrders[index.value]
        sp.else:
            self.data.uuid += 1
            self.data.sellShortOrders[self.data.uuid] = True
            self.data.orders[self.data.uuid] = sp.record(position = Position.Short, creator = sp.sender, priceBuy = params.price_buy, price = params.price_sell, quantity = params.quantity)
    
    @sp.entry_point
    def sellLong(self, params):
        sp.set_type(params, sp.TRecord(quantity = sp.TNat, price_buy = sp.TNat, price_sell = sp.TNat))
        sp.verify(~self.data.result.is_some())
        sp.verify(self.data.sharesLong[sp.sender][params.price_buy] >= sp.to_int(params.quantity))
        sp.verify(params.price_sell <= 1000000)
        
        matchPrice = 1000000 - params.price_sell
        confirmed = sp.local('confirmed', False)
        index = sp.local('index', -1)
        sp.for i in self.data.sellShortOrders.keys():
            order = self.data.orders[i]
            sp.if ~confirmed.value & (order.price == sp.as_nat(matchPrice)) & (order.quantity == params.quantity) & ~(order.creator == sp.sender):
                    confirmed.value = True
                    index.value = i
        
        sp.if confirmed.value:
            order = self.data.orders[index.value]
            sp.send(order.creator, sp.mutez((order.price * order.quantity) // 10))
            sp.send(sp.sender, sp.mutez((params.price_sell * params.quantity) // 10))
            self.data.sharesShort[order.creator][order.price] -= sp.to_int(order.quantity)
            self.data.sharesLong[sp.sender][params.price_buy] -= sp.to_int(params.quantity)
            del self.data.orders[index.value]
            del self.data.sellShortOrders[index.value]
        sp.else:
            self.data.uuid += 1
            self.data.sellLongOrders[self.data.uuid] = True
            self.data.orders[self.data.uuid] = sp.record(position = Position.Short, creator = sp.sender, priceBuy = params.price_buy, price = params.price_sell, quantity = params.quantity)
    
    
    @sp.entry_point
    def withdrawBuyOrder(self, params):
        sp.verify(self.data.orders[params.id].creator == sp.sender)
        sp.verify(self.data.buyLongOrders.contains(params.id) | self.data.buyShortOrders.contains(params.id))
        order = self.data.orders[params.id]
        sp.if self.data.buyLongOrders.contains(params.id):
            del self.data.buyLongOrders[params.id]
            sp.send(order.creator, sp.mutez((order.quantity * order.price) // 10))
        sp.else:
            del self.data.buyShortOrders[params.id]
            sp.send(order.creator, sp.mutez((order.quantity * order.price) // 10))
        
        del self.data.orders[params.id]
        
    @sp.entry_point
    def withdrawSellOrder(self, params):
        sp.verify(self.data.orders[params.id].creator == sp.sender)
        sp.verify(self.data.sellLongOrders.contains(params.id) | self.data.sellShortOrders.contains(params.id))
        sp.if self.data.sellLongOrders.contains(params.id):
            del self.data.sellLongOrders[params.id]
        sp.else:
            del self.data.sellShortOrders[params.id]
        del self.data.orders[params.id]
    
    @sp.entry_point
    def setResult(self, params):
        sp.verify(sp.now >= self.data.endTime)
        sp.verify(~self.data.result.is_some())
        sp.verify((sp.sender == sp.fst(self.data.admin)) | (sp.sender == sp.snd(self.data.admin)))
        sp.verify((params.result == Position.Long) | (params.result == Position.Short))
        self.data.result = sp.some(params.result)
    
    @sp.entry_point
    def withdrawPayout(self):
        sp.verify(self.data.result.is_some())
        sp.if self.data.result.open_some() == Position.Long:
            sp.verify(self.data.sharesLong.contains(sp.sender))
            totalPayout = sp.local('totalPayout', 0)
            sp.for i in self.data.sharesLong[sp.sender].keys():
                sp.if self.data.sharesLong[sp.sender][i] > 0:
                    totalPayout.value += (sp.as_nat(self.data.sharesLong[sp.sender][i]) * 1000000)
            sp.if totalPayout.value > 0:
                sp.send(sp.sender, sp.mutez(totalPayout.value // 10))
            del self.data.sharesLong[sp.sender]
        sp.else:
            sp.verify(self.data.sharesShort.contains(sp.sender))
            totalPayout = sp.local('totalPayout', 0)
            sp.for i in self.data.sharesShort[sp.sender].keys():
                sp.if self.data.sharesShort[sp.sender][i] > 0:
                    totalPayout.value += (sp.as_nat(self.data.sharesShort[sp.sender][i]) * 1000000)
            sp.if totalPayout.value > 0:
                sp.send(sp.sender, sp.mutez(totalPayout.value // 10))
            del self.data.sharesShort[sp.sender]
     
    ############
    # Utilities
    ############
    
    def addShares(self, params):
        sp.if params.position == Position.Long:
            sp.if ~self.data.sharesLong.contains(params.sender):
                self.data.sharesLong[params.sender] = {}
            sp.if ~self.data.sharesLong[params.sender].contains(params.price):
                self.data.sharesLong[params.sender][params.price] = 0
            self.data.sharesLong[params.sender][params.price] += sp.to_int(params.quantity)
    
        sp.if params.position == Position.Short:
            sp.if ~self.data.sharesShort.contains(params.sender):
                self.data.sharesShort[params.sender] = {}
            sp.if ~self.data.sharesShort[params.sender].contains(params.price):
                self.data.sharesShort[params.sender][params.price] = 0
            self.data.sharesShort[params.sender][params.price] += sp.to_int(params.quantity)
    
    def verifyPrice(self, params, amt):
        sp.verify((params.price % 100000 == 0) & (params.price <= 1000000), message = "Invalid price amount")
        sp.verify(sp.mutez((params.price * params.quantity) // 10) == amt)

@sp.add_test(name = "Buying and withdraw tests")
def test():
    scenario = sp.test_scenario()
    
    #Test accounts
    admin1 = sp.test_account('Admin-1')
    admin2 = sp.test_account('Admin-2')
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    mike = sp.test_account("Mike")
    
    c = Market()
    c.set_storage(sp.record(
        admin = sp.pair(admin1.address, admin2.address),
        infoIPFS = "IPFSxyz",
        uuid = 0,
        endTime = sp.timestamp(1000000),
        result = sp.none,
        orders = {},
        buyLongOrders = {},
        buyShortOrders = {},
        sellLongOrders = {},
        sellShortOrders = {},
        sharesLong = {},
        sharesShort = {} 
    ))
    scenario += c
    
    scenario.h2('Buy Long')
    scenario += c.buyLong(quantity = 10, price = 700000).run(sender = alice, amount = sp.mutez(700000))
    scenario += c.buyLong(quantity = 10, price = 300000).run(sender = bob, amount = sp.mutez(300000))
    
    scenario.h2('Buy Short')
    scenario += c.buyShort(quantity = 10, price = 300000).run(sender = mike, amount = sp.mutez(300000))
    
    scenario.h2('Withdraw')
    scenario += c.withdrawBuyOrder(id = 2).run(sender = bob)

@sp.add_test(name = "Selling and withdraw tests")
def test():
    scenario = sp.test_scenario()
    
    #Test accounts
    admin1 = sp.test_account('Admin-1')
    admin2 = sp.test_account('Admin-2')
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    mike = sp.test_account("Mike")
    john = sp.test_account("John")
    
    c = Market()
    c.set_storage(sp.record(
        admin = sp.pair(admin1.address, admin2.address),
        infoIPFS = "IPFSxyz",
        uuid = 0,
        endTime = sp.timestamp(1000000),
        result = sp.none,
        orders = {},
        buyLongOrders = {},
        buyShortOrders = {},
        sellLongOrders = {},
        sellShortOrders = {},
        sharesLong = {},
        sharesShort = {} 
    ))
    scenario += c
    
    scenario.register(c.buyLong(quantity = 10, price = 700000).run(sender = alice, amount = sp.mutez(700000)))
    scenario.register(c.buyShort(quantity = 10, price = 300000).run(sender = bob, amount = sp.mutez(300000)))
    scenario.register(c.buyShort(quantity = 10, price = 400000).run(sender = mike, amount = sp.mutez(400000)))
    scenario.register(c.buyLong(quantity = 10, price = 600000).run(sender = john, amount = sp.mutez(600000)))
    
    scenario.h2('Sell Long')
    scenario += c.sellLong(quantity = 10, price_buy = 700000, price_sell = 700000).run(sender = alice)
    
    scenario.h2('Sell Short')
    scenario += c.sellShort(quantity = 10, price_buy = 400000, price_sell = 300000).run(sender = mike)
    scenario += c.sellShort(quantity = 10, price_buy = 300000, price_sell = 500000).run(sender = bob)
    
    scenario.h2('Withdraw')
    scenario += c.withdrawSellOrder(id = 4).run(sender = bob)
    
@sp.add_test(name = "Payout withdraw test")
def test():
    scenario = sp.test_scenario()
    
    #Test accounts
    admin1 = sp.test_account('Admin-1')
    admin2 = sp.test_account('Admin-2')
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    mike = sp.test_account("Mike")
    john = sp.test_account("John")
    
    c = Market()
    c.set_storage(sp.record(
        admin = sp.pair(admin1.address, admin2.address),
        infoIPFS = "IPFSxyz",
        uuid = 0,
        endTime = sp.timestamp(1000000),
        result = sp.none,
        orders = {},
        buyLongOrders = {},
        buyShortOrders = {},
        sellLongOrders = {},
        sellShortOrders = {},
        sharesLong = {},
        sharesShort = {} 
    ))
    scenario += c
    
    scenario.register(c.buyLong(quantity = 10, price = 700000).run(sender = alice, amount = sp.mutez(700000)))
    scenario.register(c.buyShort(quantity = 10, price = 300000).run(sender = bob, amount = sp.mutez(300000)))
    scenario.register(c.buyShort(quantity = 10, price = 400000).run(sender = mike, amount = sp.mutez(400000)))
    scenario.register(c.buyLong(quantity = 10, price = 600000).run(sender = john, amount = sp.mutez(600000)))
    
    scenario.h2('Admin sets the result')
    scenario += c.setResult(result = Position.Long).run(sender = admin1, now = sp.timestamp(1000005))
    
    scenario.h2('Failed Withdrawal')
    scenario += c.withdrawPayout().run(sender = bob, valid = False)
    
    scenario.h2('Successful withdrawals')
    scenario += c.withdrawPayout().run(sender = alice)
    scenario += c.withdrawPayout().run(sender = john)
    
    scenario.verify(c.balance == sp.mutez(0))