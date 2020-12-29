import { LOAD_MARKETS_ACCOUNT } from "./types";
import IPFS from "nano-ipfs-store";

export const loadMarketsAccount = () => async (dispatch, getState) => {
  const account = getState().wallet.accountPkh;
  const mainContract = getState().contracts.main;
  const mainStorage = await mainContract.storage();
  const { markets } = mainStorage;

  const ipfs = IPFS.at("https://ipfs.infura.io:5001");

  let marketsConfigured = [];
  for (var entry of [...markets.entries()]) {
    if (entry[1] == account) {
      const instance = await getState().wallet.tezos.wallet.at(entry[0]);
      const storage = await instance.storage();
      const data = JSON.parse(await ipfs.cat(storage.infoIPFS));
      marketsConfigured.push({
        address: entry[0],
        ...data,
      });
    }
  }

  dispatch({
    type: LOAD_MARKETS_ACCOUNT,
    payload: marketsConfigured,
  });
};
