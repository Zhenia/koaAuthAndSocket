// @flow
import * as t from './actionTypes';

export const loadUpListMessages = () => {
  return {
    type: t.LOAD_UP_LIST_MESSAGES
  }
}


export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string })
