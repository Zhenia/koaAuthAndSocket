// @flow
import * as t from './actionTypes';

export const loginFormUser = (data: any) => ({
  type: t.LOGIN_FORM_USER,
  payload: data
});


export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string })
