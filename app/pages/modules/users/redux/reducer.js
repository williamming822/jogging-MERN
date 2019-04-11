import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { GET_USERS, GET_USERS_FAIL, GET_USERS_SUCCESS } from './constants';
import { getUsers, getUsersFail, getUsersSuccess } from './actions';

const newUser = {
  firstname: '',
  lastname: '',
  email: '',
};

const defaultState = fromJS({
  users: {
    list: [],
    loading: false,
  },
  user: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
});

const userReducer = handleActions(
  {
    [GET_USERS]: (state, action) => {
      console.log("getUsers action fired", action);
      return state.setIn(['users', 'loading'], true)
    },
    [GET_USERS_SUCCESS]: (state, { payload }) =>
      state.setIn(['users', 'loading'], false).setIn(['users', 'list'], fromJS(payload)),
    [GET_USERS_FAIL]: (state, action) =>
      state.setIn(['users', 'error'], action.error).setIn(['users', 'loading'], false),
  },
  defaultState,
);

export default userReducer;
