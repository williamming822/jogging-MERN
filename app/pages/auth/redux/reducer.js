import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { USER_LOGIN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from './constants';

const defaultState = fromJS({
  loading: false,
  error: false,
  currentUser: '',
  userData: {},
});

console.log('this is the type of default state', typeof defaultState);

export default handleActions(
  {
    [USER_LOGIN]: state => {
      return;
      state
        .set('loading', true)
        .set('error', false)
        .set('userData', null);
    },
    [USER_LOGIN_SUCCESS]: (state, action) =>
      state
        .set('userData', action.data)
        .set('loading', false)
        .set('currentUser', action.username),
    [USER_LOGIN_FAIL]: (state, action) =>
      state.set('error', action.error).set('loading', false),
  },
  defaultState,
);
