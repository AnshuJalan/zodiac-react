import { combineReducers } from "redux";
import walletReducer from "./wallet";
import contractsReducer from "./contractsReducer";

export default combineReducers({
  wallet: walletReducer,
  contracts: contractsReducer,
});
