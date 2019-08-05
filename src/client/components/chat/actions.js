// @flow
import * as t from './actionTypes';

export const loadUpListMessages = () => {
  return {
    type: t.LOAD_UP_LIST_MESSAGES
  }
}

export const updateNewMessage = (text) => {
  const data = {
    newMessage:text
  }
  return {
    payload: data,
    type: t.UPDATE_NEW_MESSAGE
  }
}

export const refreshBaseComponent = () =>
  ({
    type: t.REFRESH_BASE_COMPONENT
  }: { type: string })
