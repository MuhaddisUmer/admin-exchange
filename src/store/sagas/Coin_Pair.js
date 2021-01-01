import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setAllCoins, updateCoin, toggleEditCoin, toggleAddCoin, setAllPairs, toggleAddPair, } from '../actions/Coin_Pair.js';

/*========== COINS FUNCTIONS ============= */

function* getAllCoins() {
  const { error, response } = yield call(getCall, '/coin');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAllCoins(response['data']['body']));
};

function* editCoin({ payload, id }) {
  const { error, response } = yield call(putCall, { path: `/coin/${id}`, payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put(updateCoin(response['data']['body']))
    yield put(toggleEditCoin(response['data']['body']))
  }
  yield put({ type: "GET_ALL_COINS" });
};

function* addCoin({ payload }) {
  const { error, response } = yield call(postCall, { path: '/coin', payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put({ type: "GET_ALL_COINS" });
    yield put(toggleAddCoin())
  }
};

/*========== PAIRS FUNCTIONS ============= */

function* getAllPairs() {
  const { error, response } = yield call(getCall, '/pair');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAllPairs(response['data']['body']));
};

function* addPair({ payload }) {
  const { error, response } = yield call(postCall, { path: '/pair', payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put({ type: "GET_ALL_PAIRS" });
    yield put(toggleAddPair())
  }
};

function* deletePair({ payload }) {
  const { error, response } = yield call(putCall, { path: `/pair/${payload}`, payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) EventBus.publish("success", response['data']['message']);
  yield put({ type: "GET_ALL_PAIRS" });
};


function* actionWatcher() {
  yield takeEvery('GET_ALL_COINS', getAllCoins);
  yield takeEvery('EDIT_COIN', editCoin);
  yield takeEvery('ADD_COIN', addCoin);
  yield takeEvery('GET_ALL_PAIRS', getAllPairs);
  yield takeEvery('ADD_PAIR', addPair);
  yield takeEvery('DELETE_PAIR', deletePair);

}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}

function postCall({ path, payload }) {
  return axios
    .post(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
}

function getCall(path) {
  return axios
    .get(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
}

function deleteCall(path) {
  return axios
    .delete(path)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
}

function putCall({ path, payload }) {
  return axios
    .put(path, payload)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401) EventBus.publish("tokenExpired");
      return { error };
    });
}
