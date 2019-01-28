import {Action} from '@ngrx/store';
import {Credentials} from '../../services/authentication/credentials.model';
import {Token} from '../../services/authentication/jwt-parser.service';

export enum AuthActionType {
    Initialize = 'LOGIN_AUTHENTICATE_INIT',
    Authenticating = 'LOGIN_AUTHENTICATE_CREDENTIALS',
    Authenticated = 'LOGIN_AUTHENTICATE_SUCCESSFUL',
    AuthenticatedRefreshTokenObtained = 'LOGIN_AUTHENTICATE_REFRESH_TOKEN_OBTAINED',
    AuthenticatedWithToken = 'LOGIN_AUTHENTICATE_SUCCESSFUL_TOKEN',
    AuthenticateFailed = 'LOGIN_AUTHENTICATE_FAILED',
    AuthenticationLogout = 'LOGIN_AUTHENTICATE_LOGOUT',
}

export abstract class AuthenticationActions implements Action {
    type: string;

    constructor(public payload?: Object) {}
}

export class AuthenticationInit implements AuthenticationActions {
    readonly type = AuthActionType.Initialize;
}

export class AuthenticateFailed implements AuthenticationActions {
    readonly type = AuthActionType.AuthenticateFailed;
}

export class AuthenticateCredentials extends AuthenticationActions {
    readonly type = AuthActionType.Authenticating;

    constructor(public payload: Credentials) {
        super(payload);
    }
}

export class AuthenticationLogout implements AuthenticationActions {
    readonly type = AuthActionType.AuthenticationLogout;
}

export class Authenticated extends AuthenticationActions {
    readonly type = AuthActionType.Authenticated;

    constructor(public payload: Token) {
        super(payload);
    }
}

export class AuthenticatedWithToken extends AuthenticationActions {
    readonly type = AuthActionType.AuthenticatedWithToken;

    constructor(public payload: Token) {
        super(payload);
    }
}

export class AuthenticateRefreshTokenObtained extends AuthenticationActions {
    readonly type = AuthActionType.AuthenticatedRefreshTokenObtained;

    constructor(public payload: {refreshToken: string}) {
        super(payload);
    }
}
