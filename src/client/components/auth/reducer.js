// @flow
import * as t from './actionTypes';
type State = {
    isLoad: boolean,
    error: any,
    pageData: any
  };

export const initialState: State = {
  isLoad: false,
  error: null,
  pageData: null
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case t.LOGOUT_FORM_USER: {
      window.localStorage.removeItem('token');
      return {
        ...state,
        isLoad: false,
        pageData: {
          ...state.pageData,
          name: '',
          token: '',
          email: '',
          password: ''
        }
      };
    }
    case t.UPDATE_PAGE_DATA: {
      return {
          ...state,
          isLoad: false,
          pageData: {
                ...state.pageData,
                ...action.payload
          }
      };
    }
    case t.REFRESH_BASE_COMPONENT: {
      return initialState;
    }
    default:
      return state;
  }
};
