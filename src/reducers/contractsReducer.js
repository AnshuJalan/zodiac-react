import { LOAD_MAIN_CONTRACT, LOAD_MARKETS } from "../actions/types";

const INITIAL_STATE = {
  main: null,
  markets: [],
  loading: true,
};

//eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MAIN_CONTRACT:
      return {
        ...state,
        main: action.payload,
      };
    case LOAD_MARKETS:
      return {
        ...state,
        loading: false,
        markets: action.payload,
      };
    default:
      return state;
  }
};
