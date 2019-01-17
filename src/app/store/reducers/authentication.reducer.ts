import {AuthActionType, AuthenticationActions} from '../actions';
import {AuthState} from '..';

export enum AuthStoreStatus {
    Empty = 'empty',
    Ready = 'ready',
    Authenticating = 'authenticating',
    Authenticated = 'authenticated',
    AuthenticateFailed = 'authenticate-failed'
}

export const initialState: AuthState = {
    authToken: null,
    username: null,
    expiration: null,
    issued: null,
    status: AuthStoreStatus.Empty
};

export function authReducer(state = initialState, action: AuthenticationActions ) {

    switch (action.type) {

        case AuthActionType.Initialize:
            return { ... initialState,  status: AuthStoreStatus.Ready };

        case AuthActionType.Authenticating:
            return { ...state, status: AuthStoreStatus.Authenticating };

        case AuthActionType.Authenticated:
        case AuthActionType.AuthenticatedWithToken:
            return {
                ...state,
                ... action.payload,
                status: AuthStoreStatus.Authenticated,
            };

        case AuthActionType.AuthenticateFailed:
            return { ...state, status: AuthStoreStatus.AuthenticateFailed };

        default:
            return state;
    }
}
