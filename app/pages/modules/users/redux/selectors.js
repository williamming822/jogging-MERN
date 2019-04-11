import { createSelector } from 'reselect';

const selectUser = state => state.get('app').get('user');

const makeSelectUserList = () =>
  createSelector(selectUser, userData => userData.getIn(['users', 'list']));

const makeSelectUserListLoading = () =>
  createSelector(selectUser, userData => userData.getIn(['users', 'loading']));

const makeSelectUser = () =>
  createSelector(selectUser, userData => userData.get('user'));

const makeSelectUserLoading = () =>
  createSelector(selectUser, userData => userData.getIn(['user', 'loading']));

export {
  selectUser,
  makeSelectUserList,
  makeSelectUserListLoading,
  makeSelectUser,
  makeSelectUserLoading,
}
