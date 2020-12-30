import {
  LOAD_MARKETS_ACCOUNT,
  LOAD_MARKET_SHOW,
  CLEAR_LOADED_MARKET,
} from "../actions/types";

const INITIAL_MARKET = {
  buyLongOrders: [],
  buyShortOrders: [],
  sellLongOrders: [],
  sellShortOrders: [],
};

const INITIAL_STATE = {
  market: INITIAL_MARKET,
  marketsAccount: [],
  marketLoading: true,
  accountLoading: true,
};

//eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MARKETS_ACCOUNT:
      return {
        ...state,
        marketsAccount: action.payload,
        accountLoading: false,
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
        market: INITIAL_MARKET,
        marketLoading: true,
      };
    default:
      return state;
  }
};
