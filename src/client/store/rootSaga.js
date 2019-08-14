import { all, fork } from 'redux-saga/effects'
import users from '../components/users'
import chat from '../components/chat'
import auth from '../components/auth'
import googleAuth from '../components/googleAuth'
import loginForm from '../components/loginForm'

const sagas = {
  ...users.sagas.watchers,
  ...chat.sagas.watchers,
  ...auth.sagas.watchers,
  ...googleAuth.sagas.watchers,
  ...loginForm.sagas.watchers
};
export default function* rootSaga() {
  yield all(Object.keys(sagas).map(sagaName => fork(sagas[sagaName])));
}
