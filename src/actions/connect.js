import { CONNECT_WALLET } from "./types";
import { ThanosWallet } from "@thanos-wallet/dapp";

export const connectWallet = () => async (dispatch) => {
  const wallet = new ThanosWallet("Dapp Wallet");
  await wallet.connect("delphinet", { forcePermission: true });
  const tezos = wallet.toTezos();
  const accountPkh = await tezos.wallet.pkh();
  const accountBalance = await tezos.tz.getBalance(accountPkh);
  console.log("Hello world");
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