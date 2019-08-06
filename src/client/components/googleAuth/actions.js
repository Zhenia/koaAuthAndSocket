// @flow
import * as t from './actionTypes';



export const updateDataPage = (data) => {
  return {
    payload: data,
    type: t.UPDATE_DATA_PAGE
  }
}

export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string })
