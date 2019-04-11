import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { USER_LOGIN, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from './constants';
import { userLogin, userLoginSuccess } from './actions';

const defaultState = fromJS({
  loading: false,
  error: false,
  currentUser: {},
});

const reducer = handleActions(
  {
    [USER_LOGIN]: state => {
      return state
        .set('loading', true)
        .set('error', false);
    },
    [USER_LOGIN_SUCCESS]: (state, {payload}) =>
      state.set('loading', false).set('currentUser', fromJS(payload)),
    [USER_LOGIN_FAIL]: (state, action) =>
      state.set('error', action.error).set('loading', false),
  },
  defaultState,
);

export default reducer;
