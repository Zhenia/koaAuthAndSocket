// @flow
import * as t from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
import fetch from './../../utils/api';

export function* loginFormUser(action: any): any {
  try {
    const response = yield call(fetch.post, '/login',{
        email: action.payload.email,
        password: action.payload.password
    });
    yield put({
      type: t.LOGIN_FORM_USER_SUCCEEDED,
      payload: {
        name: response.data.name,
        token: response.data.token,
      }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.LOGIN_FORM_USER_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
  }
}

export function* watcherLogin(): any {
  yield takeEvery(t.LOGIN_FORM_USER, loginFormUser);
}

export const watchers = {
  watcherLogin
};
