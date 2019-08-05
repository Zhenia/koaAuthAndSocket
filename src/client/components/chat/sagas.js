// @flow
import * as t from './actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';

import fetch from './../../utils/api';

export function* loadUpListMessages(action: any): any {
  try {
    const response = yield call(fetch.get, '/messages');
    yield put({
      type: t.LOAD_UP_LIST_MESSAGES_SUCCEEDED,
      payload: {
        messages: response.data.messages
      }
    });
  } catch (error) {
    const response = error.response || { data: {} };
    yield put({
      type: t.LOAD_UP_LIST_MESSAGES_FAILED,
      error: {
        message: response.data.message || error.message,
        stack: error.stack,
        status: error.response && error.response.status,
        statusText: error.response && error.response.statusText
      }
    });
  }
}



export function* watcherLoadUpListMessages(): any {
  yield takeEvery(t.LOAD_UP_LIST_MESSAGES, loadUpListMessages);
}


export const watchers = {
  watcherLoadUpListMessages
};
