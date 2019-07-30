// @flow
import * as t from './actionTypes';

export const loadUpListUsers = () => {
  return {
    type: t.LOAD_UP_LIST_USERS
  };
};


export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string });
