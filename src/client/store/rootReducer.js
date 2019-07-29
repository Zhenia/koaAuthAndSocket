import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userList from './../components/userList';

export default combineReducers({
  form: formReducer,
  [userList.constants.NAME]: userList.reducer,
});