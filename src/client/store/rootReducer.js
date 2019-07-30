import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import users from './../components/users';
import chat from './../components/chat';

export default combineReducers({
  form: formReducer,
  [users.constants.NAME]: users.reducer,
  [chat.constants.NAME]: chat.reducer
})