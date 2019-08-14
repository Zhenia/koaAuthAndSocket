// @flow
import * as t from './actionTypes';

export const logoutFormUser = () => ({
  type: t.LOGOUT_FORM_USER,
  payload: {}
}: { type: string })

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




