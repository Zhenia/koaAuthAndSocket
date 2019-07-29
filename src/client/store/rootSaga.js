import { all, fork } from 'redux-saga/effects';

import user from '../components/userList';

const sagas = {
  ...user.sagas.watchers
};
export default function* rootSaga() {
  yield all(Object.keys(sagas).map(sagaName => fork(sagas[sagaName])));
}
