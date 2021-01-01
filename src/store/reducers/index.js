import { combineReducers } from "redux";
import Auth from "./Auth.js";
import Coin_Pair from "./Coin_Pair.js";
import User from "./User.js";

export default combineReducers(
  {
    Auth: Auth,
    Coin_Pair: Coin_Pair,
    User: User,
  });
