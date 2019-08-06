import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import users from './../components/users'
import chat from './../components/chat'
import auth from './../components/auth'
import googleAuth from '../components/googleAuth'

export default combineReducers({
  form: formReducer,
  [users.constants.NAME]: users.reducer,
  [chat.constants.NAME]: chat.reducer,
  [auth.constants.NAME]: auth.reducer,
  [googleAuth.constants.NAME]: googleAuth.reducer
})