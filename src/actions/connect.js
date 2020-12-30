import { CONNECT_WALLET, LOAD_MAIN_CONTRACT, LOAD_MARKETS } from "./types";
import { ThanosWallet } from "@thanos-wallet/dapp";
import IPFS from "nano-ipfs-store";

export const connectWallet = (permission) => async (dispatch) => {
  if (!ThanosWallet.isAvailable) {
    alert(
      "Thanos Wallet not installed! Please install Thanos Wallet to use this dapp"
    );
    return;
  }

  const wallet = new ThanosWallet("Dapp Wallet");
  await wallet.connect("delphinet", { forcePermission: permission });
  const tezos = wallet.toTezos();
  const accountPkh = await tezos.wallet.pkh();
  const accountBalance = await tezos.tz.getBalance(accountPkh);
  dispatch({
    type: CONNECT_WALLET,
    payload: {
      tezos,
      accountPkh,
      accountBalance,
    },
  });
};

export const loadMainContract = () => async (dispatch, getState) => {
  const tezos = getState().wallet.tezos;
  const mainInstance = await tezos.wallet.at(
    process.env.REACT_APP_MAIN_CONTRACT
  );

  dispatch({
    type: LOAD_MAIN_CONTRACT,
    payload: mainInstance,
  });
};

export const loadMarkets = () => async (dispatch, getState) => {
  const mainContract = getState().contracts.main;
  const mainStorage = await mainContract.storage();
  const { markets } = mainStorage;

  const ipfs = IPFS.at("https://ipfs.infura.io:5001");

  let marketsConfigured = [];
  for (var entry of [...markets.entries()]) {
    const instance = await getState().wallet.tezos.wallet.at(entry[0]);
    const storage = await instance.storage();
    const data = JSON.parse(await ipfs.cat(storage.infoIPFS));
    marketsConfigured.push({
      address: entry[0],
      creator: entry[1],
      ...data,
    });
  }

  dispatch({
    type: LOAD_MARKETS,
    payload: marketsConfigured,
  });
};
