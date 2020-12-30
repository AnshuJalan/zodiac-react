import { combineReducers } from "redux";
import walletReducer from "./wallet";
import contractsReducer from "./contractsReducer";
import marketReducer from "./marketReducer";

export default combineReducers({
  wallet: walletReducer,
  contracts: contractsReducer,
  markets: marketReducer,
});
