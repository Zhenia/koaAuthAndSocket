// @flow
import * as t from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';

import fetch from './../../utils/api';

export function* loadUpListRoles(action: any): any {
  try {
    const roleType = yield call(fetch.get, '/api/user/current');
    const response = yield call(fetch.get, '/api/roles/');
    yield put({
      type: t.LOAD_UP_LIST_ROLES_SUCCEEDED,
      payload: {
        roles: response.result.data.roles,
        roleType: roleType.result.data.role
      }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.LOAD_UP_LIST_ROLES_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
  }
}



export function* watcherLoadUpListRoles(): any {
  yield takeEvery(t.LOAD_UP_LIST_ROLES, loadUpListRoles);
}


export const watchers = {
  watcherLoadUpListRoles
};
