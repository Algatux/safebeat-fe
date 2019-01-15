import { createSelector } from '@ngrx/store';

export type SafebeatState = {
    auth: AuthState
};

export const selectSafebeatState = createSelector((state: SafebeatState) => state);

export type AuthState = {
    authenticated: boolean,
    authToken: string | null,
    username: string | null,
    expiration: Date | null,
    issued: Date | null,
    authenticating: boolean
};

export const selectAuthState = createSelector((state: SafebeatState) => state.auth);
