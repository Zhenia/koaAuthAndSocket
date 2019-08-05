import { createSelector } from 'reselect';
import { NAME } from './constants';

export const getPageData = (state: any) => state[NAME].pageData;
export const getError = (state: any) => state[NAME].error;
export const getLoader = (state: any) => state[NAME].isLoad;

export const selectLoader = createSelector(getLoader, (isLoad: any) => {
  return isLoad;
});

export const selectPageData = createSelector(getPageData, (pageData: any) => {
  console.log(pageData);
  return pageData;
});

export const selectError = createSelector(getError, (error: any) => {
  return error;
});