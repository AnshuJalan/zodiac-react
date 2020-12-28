import { CONNECT_WALLET, LOAD_MAIN_CONTRACT, LOAD_MARKETS } from "./types";
import { ThanosWallet } from "@thanos-wallet/dapp";

export const connectWallet = () => async (dispatch) => {
  const wallet = new ThanosWallet("Dapp Wallet");
  await wallet.connect("delphinet", { forcePermission: true });
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
  //mountContracts(dispatch, tezos);
};
// const mountContracts = async (dispatch, tezos) => {
//   const priceBettingInstance = await tezos.wallet.at(
//     process.env.REACT_APP_CONTRACT | "KT1TkQpyAP6Q4mHdB8W3ouiEXKrHTkvwdEDZ"
//   );
//   dispatch({
//     type: LOAD_CONTRACT,
//     payload: priceBettingInstance,
//   });
// };

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

  dispatch({
    type: LOAD_MARKETS,
    payload: markets,
  });
};
