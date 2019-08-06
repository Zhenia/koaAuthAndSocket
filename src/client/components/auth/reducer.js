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
    case t.LOGIN_FORM_USER: {
      return { ...state, isLoad: true, error: null };
    }
    case t.LOGIN_FORM_USER_FAILED: {
      return { ...state, isLoad: false, error: action.error, pageData: {name:'ttttt'}};
    }
    case t.UPDATE_PAGE_DATA: {
      return {
          ...state,
          isLoad: false,
          pageData: {
                ...state.pageData,
                [action.payload.name]: action.payload.value
          }
     };
    }
    case t.LOGIN_FORM_USER_SUCCEEDED: {
      window.localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoad: false,
        pageData: {
          ...state.pageData,
          name: action.payload.name,
          token: action.payload.token
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
