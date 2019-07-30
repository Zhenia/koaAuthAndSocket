// @flow
import * as t from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';

import fetch from './../../utils/api';

export function* loadUpListUsers(action: any): any {
  try {
   // const roleType = yield call(fetch.get, '/api/user/current');
    const response = yield call(fetch.get, '/users');
    yield put({
      type: t.LOAD_UP_LIST_USERS_SUCCEEDED,
      payload: {
        users: response.data.users,
        roleType: {}
      }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.LOAD_UP_LIST_USERS_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
  }
}



export function* watcherLoadUpListUsers(): any {
  yield takeEvery(t.LOAD_UP_LIST_USERS, loadUpListUsers);
}


export const watchers = {
  watcherLoadUpListUsers
};
