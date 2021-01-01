import axios from 'axios';
import EventBus from 'eventing-bus';
import { all, takeEvery, call, put } from 'redux-saga/effects';

import { setAllUsers, setSingleUser, toggleIsActive, toggleIsPassword, toggleIsSMS, toggleIsTwoFA, setContactRequest } from '../actions/User.js';

function* getAllUsers() {
  const { error, response } = yield call(getCall, '/admin/user');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setAllUsers(response['data']['body']));
};

function* getSingleUser({ payload }) {
  const { error, response } = yield call(getCall, `/admin/user/${payload}`);
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    yield put(setSingleUser(response['data']['body']));
    yield put(toggleIsActive(false));
    yield put(toggleIsPassword(false));
    yield put(toggleIsSMS(false));
    yield put(toggleIsTwoFA(false));
  }
};

function* updateUser({ payload, id }) {
  const { error, response } = yield call(putCall, { path: `/admin/user/${id}`, payload });
  if (error) EventBus.publish("error", error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put({ type: 'GET_SINGLE_USER', payload: id });
  }
};

function* getContactRequest() {
  const { error, response } = yield call(getCall, '/users/contact');
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) yield put(setContactRequest(response['data']['body']));
};

function* resolveTicket({ payload }) {
  const { error, response } = yield call(postCall, { path: `/users/contact/${payload}`, payload });
  if (error) EventBus.publish('error', error['response']['data']['message']);
  else if (response) {
    EventBus.publish("success", response['data']['message']);
    yield put({ type: 'GET_CONTACT_REQUEST' });
  }
};


function* actionWatcher() {
  yield takeEvery('GET_ALL_USERS', getAllUsers);
  yield takeEvery('GET_SINGLE_USER', getSingleUser);
  yield takeEvery('UPDATE_USER', updateUser);
  yield takeEvery('GET_CONTACT_REQUEST', getContactRequest);
  yield takeEvery('RESOLVE_TICKET', resolveTicket);
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
