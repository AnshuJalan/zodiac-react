import smartpy as sp

#The factory contract for Market

class Main(sp.Contract):
    def __init__(self, _admin):
        self.market = Market()
        self.init(markets = sp.map(tkey = sp.TAddress, tvalue = sp.TAddress), admin = _admin)
    
    @sp.entry_point
    def setAdmin(self,params):
        sp.verify(sp.sender == self.data.admin)
        self.data.admin = params.newAdmin
        
    @sp.entry_point
    def createMarket(self, params):
        sp.set_type(params, sp.TRecord(end = sp.TInt, ipfsString = sp.TString))
        contractAddress = sp.create_contract(storage = sp.record(
            admin = sp.pair(self.data.admin, sp.sender),
            infoIPFS = params.ipfsString,
            uuid = 0,
            endTime = sp.timestamp(0).add_seconds(params.end),
            result = sp.none,
            orders = {},
            buyLongOrders = {},
            buyShortOrders = {},
            sellLongOrders = {},
            sellShortOrders = {},
            sharesLong = {},
            sharesShort = {} 
        ), contract = self.market)
        self.data.markets[contractAddress] = sp.sender
        
@sp.add_test(name = "main contract test")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("Admin")

    c = Main(_admin = admin.address)
    scenario += c
    scenario += c.createMarket(end = 1000000, ipfsString = "IPFS_XYZ").run(sender = admin)