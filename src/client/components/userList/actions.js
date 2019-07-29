// @flow
import * as t from './actionTypes';

export const loadUpListRoles = () => {
  return {
    type: t.LOAD_UP_LIST_ROLES
  };
};


export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string });
