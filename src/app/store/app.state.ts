import {AuthStoreStatus} from './reducers/authentication.reducer';

export type SafebeatState = {
    auth: AuthState
};

export type AuthState = {
    authToken: string | null,
    username: string | null,
    expiration: Date | null,
    issued: Date | null,
    status: AuthStoreStatus
};

export const selectAuthState = (state: SafebeatState) => state.auth;
