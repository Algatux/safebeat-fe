
import { Action } from '@ngrx/store';
import { AuthActionsTypes, Login, Logout, LoginFromCokie } from './authentication.actions';

export type AuthState = {
    authenticated: boolean,
    authToken: string | null,
    username: string | null,
    expiration: Date | null,
    issued: Date | null
};

export const initialState: AuthState = {
    authenticated: false,
    authToken: null,
    username: null,
    expiration: null,
    issued: null
};

export function authReducer(state = initialState, action: Login | Logout | LoginFromCokie) {
  switch (action.type) {
    case AuthActionsTypes.Login:
    case AuthActionsTypes.LoginFromCokie:
        return {
            ...state,
            authenticated: true,
            authToken : action.token.raw,
            username: action.token.username,
            expiration: action.token.expiration,
            issued: action.token.issued
        };

    case AuthActionsTypes.Logout:
      return initialState;

    default:
      return initialState;
  }
}
