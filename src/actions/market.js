import {
  CLEAR_LOADED_MARKET,
  LOAD_MARKETS_ACCOUNT,
  LOAD_MARKET_SHOW,
} from "./types";
import IPFS from "nano-ipfs-store";

export const loadMarketsAccount = () => async (dispatch, getState) => {
  const account = getState().wallet.accountPkh;
  const mainContract = getState().contracts.main;
  const mainStorage = await mainContract.storage();
  const { markets } = mainStorage;

  const ipfs = IPFS.at("https://ipfs.infura.io:5001");

  let marketsConfigured = [];
  for (var entry of [...markets.entries()]) {
    if (entry[1] === account) {
      const instance = await getState().wallet.tezos.wallet.at(entry[0]);
      const storage = await instance.storage();
      const data = JSON.parse(await ipfs.cat(storage.infoIPFS));
      marketsConfigured.push({
        address: entry[0],
        instance,
        ...data,
      });
    }
  }

  dispatch({
    type: LOAD_MARKETS_ACCOUNT,
    payload: marketsConfigured,
  });
};

export const loadMarketShow = (address) => async (dispatch, getState) => {
  dispatch({
    type: CLEAR_LOADED_MARKET,
  });

  const account = getState().wallet.accountPkh;
  const instance = await getState().wallet.tezos.wallet.at(address);
  const storage = await instance.storage();

  const buyLongOrders = getResults(
    [...storage.buyLongOrders.keys()],
    storage.orders
  );
  const buyShortOrders = getResults(
    [...storage.buyShortOrders.keys()],
    storage.orders
  );
  const sellLongOrders = getResults(
    [...storage.sellLongOrders.keys()],
    storage.orders
  );
  const sellShortOrders = getResults(
    [...storage.sellShortOrders.keys()],
    storage.orders
  );

  let sharesShort = [];
  if (storage.sharesShort.has(account)) {
    sharesShort = [...storage.sharesShort.get(account)];
  }

  let sharesLong = [];
  if (storage.sharesLong.has(account)) {
    sharesLong = [...storage.sharesLong.get(account)];
  }

  const data = {
    instance,
    buyLongOrders,
    buyShortOrders,
    sellShortOrders,
    sellLongOrders,
    sharesShort,
    sharesLong,
    result: storage.result,
    infoIPFS: storage.infoIPFS,
    endTime: new Date(storage.endTime),
  };

  dispatch({
    type: LOAD_MARKET_SHOW,
    payload: data,
  });
};

function getResults(arr, orders) {
  let result = [];
  for (let a of arr) {
    result.push(orders.get(a));
  }
  return result;
}
