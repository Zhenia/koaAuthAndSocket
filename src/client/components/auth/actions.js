// @flow
import * as t from './actionTypes';

export const loginFormUser = (data: any) => ({
  type: t.LOGIN_FORM_USER,
  payload: data
});
export const logoutFormUser = () => ({
  type: t.LOGOUT_FORM_USER,
  payload: {}
});

export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string })

export const updatePageData = (data: any) =>{
  return ({
    type: t.UPDATE_PAGE_DATA,
    payload: data
  }: { type: string })
}




