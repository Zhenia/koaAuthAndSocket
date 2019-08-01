import { all, fork } from 'redux-saga/effects'
import users from '../components/users'
import chat from '../components/chat'
import auth from '../components/auth'

const sagas = {
  ...users.sagas.watchers,
  ...chat.sagas.watchers,
  ...auth.sagas.watchers
};
export default function* rootSaga() {
  yield all(Object.keys(sagas).map(sagaName => fork(sagas[sagaName])));
}
