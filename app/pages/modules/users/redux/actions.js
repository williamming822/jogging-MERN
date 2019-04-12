import { createAction } from 'redux-actions';
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

export const getUsers = createAction(GET_USERS);
export const getUsersFail = createAction(GET_USERS_FAIL);
export const getUsersSuccess = createAction(GET_USERS_SUCCESS);

export const getUser = createAction(GET_USER);
export const getUserFail = createAction(GET_USER_FAIL);
export const getUserSuccess = createAction(GET_USER_SUCCESS);

export const deleteUser = createAction(DELETE_USER);
export const deleteUserFail = createAction(DELETE_USER_FAIL);
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);

export const saveUser = createAction(SAVE_USER);
export const saveUserFail = createAction(SAVE_USER_FAIL);
export const saveUserSuccess = createAction(SAVE_USER_SUCCESS);
