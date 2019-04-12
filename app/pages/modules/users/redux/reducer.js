import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  SAVE_USER,
  SAVE_USER_FAIL,
  SAVE_USER_SUCCESS,
 } from './constants';

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
    [GET_USER]: (state, { payload }) =>
      state.setIn(['user', 'id'], fromJS(payload._id)).setIn(['user', 'loading'], true),
    [GET_USER_SUCCESS]: (state, { payload }) =>
      state.setIn(['user', 'loading'], false).setIn(['user', 'id'], fromJS(payload._id)).setIn(['user', 'data'], fromJS(payload)),
    [GET_USER_FAIL]: (state, { payload }) =>
      state.setIn(['user', 'error'], payload.error).setIn(['user', 'loading'], false),
    [SAVE_USER]: (state, { payload }) =>
      state,
    [SAVE_USER_SUCCESS]: (state, { payload }) =>
      state.setIn(['user', 'loading'], false).setIn(['user', 'id'], payload._id).setIn(['user', 'data'], fromJS(payload)),
    [SAVE_USER_FAIL]: (state, { payload }) =>
      state.setIn(['user', 'error'], payload.error).setIn(['user', 'loading'], false),
    [DELETE_USER_SUCCESS]: (state, { payload }) =>
      {
        console.log("payload", payload['_id']);
        const userList = state.getIn(['users', 'list']);
        const filteredList = userList.filter((user) => user.get('_id') !== payload['_id']);
        return state.setIn(['users', 'list'], fromJS(filteredList))
          .setIn(['users', 'loading'], false)
          .setIn(['user', 'loading'], false);
      },
    [DELETE_USER]: (state, { payload }) =>
      state.setIn(['user', 'loading'], false).setIn(['user', 'id'], fromJS('')).setIn(['user', 'data'], fromJS({})),
    [DELETE_USER_FAIL]: (state, { payload }) =>
      state.setIn(['user', 'error'], payload.error).setIn(['user', 'loading'], false),
  },
  defaultState,
);

export default userReducer;
