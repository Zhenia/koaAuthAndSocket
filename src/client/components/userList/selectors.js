import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getPageData = (state) => state[NAME].pageData;
export const getError = (state) => state[NAME].error;
export const getLoader = (state) => state[NAME].isLoad;

export const selectLoader = createSelector(getLoader, (isLoad) => {
  return isLoad;
});

export const selectPageData = createSelector(getPageData, (pageData) => {
  let currentRole;
  let currentRoleType;
  if (pageData && pageData.roles) {
    for (let role of pageData.roles) {
      if (role.title === pageData.roleType) {
        currentRole = role.public_title;
        currentRoleType = role.title;
        break;
      }
    }
    return {
      ...pageData,
      currentRole: currentRole,
      currentRoleType: currentRoleType
    };
  }
  return null;
});

export const selectError = createSelector(getError, (error) => {
  return error;
});
