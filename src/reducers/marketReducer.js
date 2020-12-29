import { LOAD_MARKETS_ACCOUNT } from "../actions/types";

const INITIAL_STATE = {
  market: null,
  marketsAccount: [],
};

//eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MARKETS_ACCOUNT:
      return {
        ...state,
        marketsAccount: action.payload,
      };
    default:
      return state;
  }
};
