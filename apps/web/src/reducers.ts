import { Reducer } from 'redux';

import {
  getAccessTokenStorage, clearAccessTokenStorage } from '@/services/storage';
import { AuthActionTypes, AuthGlobalState } from './types';

// Type-safe initialState!
export const initialState: AuthGlobalState = {
  isAuthenticated: !!getAccessTokenStorage(),
};

const reducer: Reducer<AuthGlobalState> = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case AuthActionTypes.SIGNIN_SUCCESS_GLOBAL:
      return { ...state, isAuthenticated: true };
    case AuthActionTypes.SIGNUP_SUCCESS_GLOBAL:
      return { ...state, isAuthenticated: true };
    case AuthActionTypes.SIGNOUT_SUCCESS_GLOBAL:
      clearAccessTokenStorage();
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

/*
 * Instead of using default export, we use named exports. That way we can group these exports
 * inside the `index.js` folder.
 */
export { reducer as authGlobalReducer };
