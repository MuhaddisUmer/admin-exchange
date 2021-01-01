import axios from 'axios';
import jwt_decode from 'jwt-decode';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { saveloginData, setAdminData, toggleAdminPassword, setAdminWallets, setDashboardStats, setMultiWallets, toggleSendNew } from '../actions/Auth';

function* login({ payload, history }) {
  const { error, response } = yield call(postCall, { path: '/users/auth', payload });
  if (error) {
    yield put({ type: "IS_LOGIN_DISABLED" });
    EventBus.publish("error", error['response']['data']['message']);
  }
  else if (response) {
    const decoded = jwt_decode(response["data"]["body"]["token"]);
    if (decoded["role"] !== "admin") {
      EventBus.publish("error", "Can't login through User account ");
      return;
    }
    yield put(saveloginData(response['data']['body']));
    yield put({ type: "IS_LOGIN_DISABLED" });
    EventBus.publish("success", response['data']['message'])
    setTimeout(() => history.push('/home'), 1000);
  }
};

/*========== ADMIN FUNCTIONS =============*/

function* getAdminData() {
  const { error, response } = yield call(getCall, '/admin');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAdminData(response['data']['body']));
};

function* changeAdminPassword({ payload }) {

  const { error, response } = yield call(putCall, { path: `/admin`, payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put(toggleAdminPassword());
  }
};

function* getAdminWallets() {
  const { error, response } = yield call(getCall, '/admin/wallets');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAdminWallets(response['data']['body']));
};

/*========== DASHBOARD FUNCTIONS =============*/

function* getDashboardStats() {
  const { error, response } = yield call(getCall, '/admin/dashboard');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setDashboardStats(response['data']['body']));
};

/*========== SEND NEW TRANSACTIONS FUNCTIONS =============*/

function* getMultiWallets() {
  const { error, response } = yield call(getCall, '/admin/multiSign');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setMultiWallets(response['data']['body']));
};

function* sendNewTransactions({ payload }) {
  const { error, response } = yield call(postCall, { path: '/admin/multiSign', payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    yield put(toggleSendNew());
    EventBus.publish("success", response['data']['message']);

  }
};


function* actionWatcher() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('GET_ADMIN_DATA', getAdminData);
  yield takeEvery('CHANGE_ADMIN_PASSWORD', changeAdminPassword);
  yield takeEvery('GET_ADMIN_WALLETS', getAdminWallets);
  yield takeEvery('GET_MULTI_WALLETS', getMultiWallets);
  yield takeEvery('GET_DASHBOARD_STATS', getDashboardStats);
  yield takeEvery('SEND_NEW_TRANSACTIONS', sendNewTransactions);
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
