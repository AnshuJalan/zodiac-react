import { CONNECT_WALLET } from "../actions/types";

const INITIAL_STATE = {
  tezos: null,
  connected: false,
  accountPkh: null,
  accountBalance: null,
};

//eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      const newState = {
        ...action.payload,
        connected: true,
      };
      return newState;
    default:
      return state;
  }
};