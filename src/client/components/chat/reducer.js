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
    case t.LOAD_UP_LIST_MESSAGES: {
      return { ...state, isLoad: true, error: null };
    }
    case t.LOAD_UP_LIST_MESSAGES_FAILED: {
      return { ...state, isLoad: false, error: action.error };
    }
    case t.LOAD_UP_LIST_MESSAGES_SUCCEEDED: {
      
      return {
        ...state,
        isLoad: false,
        pageData: {
          ...state.pageData,
          messages: action.payload.messages,
          roleType: action.payload.roleType
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
