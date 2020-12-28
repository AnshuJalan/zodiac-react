import { combineReducers } from "redux";
import "./wallet";
import walletReducer from "./wallet";
export default combineReducers({
    wallet : walletReducer
});
