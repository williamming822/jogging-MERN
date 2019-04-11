import { createSelector } from 'reselect';

const selectAuth = state => state.get('auth');

const makeSelectCurrentUser = () =>
  createSelector(selectAuth, userState => userState.get('currentUser'));

const makeSelectUserData = () =>
  createSelector(selectAuth, userState => userState.get('userData'));

const makeSelectError = () =>
  createSelector(selectAuth, userState => userState.get('error'));

export {
  selectAuth,
  makeSelectCurrentUser,
  makeSelectUserData,
  makeSelectError,
};
