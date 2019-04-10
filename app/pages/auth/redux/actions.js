import { createAction } from 'redux-actions';
import { USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from './constants';

export const userLogin = createAction(USER_LOGIN);
export const userLoginSuccess = createAction(USER_LOGIN_SUCCESS);
export const userLoginFail = createAction(USER_LOGIN_FAIL);
