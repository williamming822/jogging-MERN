import { createAction } from 'redux-actions';
import {
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
} from './constants';

export const getUsers = createAction(GET_USERS);
export const getUsersFail = createAction(GET_USERS_FAIL);
export const getUsersSuccess = createAction(GET_USERS_SUCCESS);
