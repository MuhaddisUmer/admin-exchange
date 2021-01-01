import { all } from 'redux-saga/effects';
import authSagas from './Auth.js';
import coin_pairSagas from './Coin_Pair.js';
import userSagas from './User.js';


export default function* rootSaga() {
  yield all([
    authSagas(),
    coin_pairSagas(),
    userSagas(),
  ]);
}

