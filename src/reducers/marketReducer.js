import {
  LOAD_MARKETS_ACCOUNT,
  LOAD_MARKET_SHOW,
  CLEAR_LOADED_MARKET,
} from "../actions/types";

const INITIAL_STATE = {
  market: {},
  marketsAccount: [],
  marketLoading: true,
};

//eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MARKETS_ACCOUNT:
      return {
        ...state,
        marketsAccount: action.payload,
      };
    case LOAD_MARKET_SHOW:
      return {
        ...state,
        market: action.payload,
        marketLoading: false,
      };
    case CLEAR_LOADED_MARKET:
      return {
        ...state,
        market: {},
        marketLoading: true,
      };
    default:
      return state;
  }
};
