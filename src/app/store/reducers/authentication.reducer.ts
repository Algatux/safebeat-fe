
import {AuthActionTypes, AuthenticateCredentials} from '../actions/authentication.actions';
import {AuthState} from '..';

export const initialState: AuthState = {
    authenticated: false,
    authToken: null,
    username: null,
    expiration: null,
    issued: null,
    authenticating: false
};

export function authReducer(state = initialState, action: AuthenticateCredentials ) {
  switch (action.type) {
    case AuthActionTypes.Authenticate:
        return {
            ...state,
            authenticating: true
        };

    default:
      return initialState;
  }
}
