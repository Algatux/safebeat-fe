import {Action} from '@ngrx/store';
import {Credentials} from '../../services/authentication/credentials.model';
import {Token} from '../../services/authentication/jwt-parser.service';

export enum AuthActionType {
    Initialize = 'AUTH_INIT',
    Authenticating = 'AUTH_CREDENTIALS',
    Authenticated = 'AUTH_SUCCESSFUL',
    RefreshTokenObtained = 'AUTH_REFRESH_TOKEN_OBTAINED',
    AuthTokenNeedsRefresh = 'AUTH_TOKEN_NEEDS_REFRESH',
    AuthenticatedWithToken = 'AUTH_SUCCESSFUL_TOKEN',
    AuthenticationFailed = 'AUTH_FAILED',
    Logout = 'AUTH_LOGOUT',
}

export abstract class AuthenticationActions implements Action {
    type: string;

    constructor(public payload?: Object) {}
}

export class AuthenticationInit implements AuthenticationActions {
    readonly type = AuthActionType.Initialize;
}

export class AuthenticateFailed implements AuthenticationActions {
    readonly type = AuthActionType.AuthenticationFailed;
}

export class AuthenticateCredentials extends AuthenticationActions {
    readonly type = AuthActionType.Authenticating;

    constructor(public payload: Credentials) {
        super(payload);
    }
}

export class AuthenticationLogout extends AuthenticationActions {
    readonly type = AuthActionType.Logout;


    constructor(public payload: {deleteRefresh: boolean}) {
        super(payload);
    }
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
    readonly type = AuthActionType.RefreshTokenObtained;

    constructor(public payload: {refreshToken: string}) {
        super(payload);
    }
}

export class AuthenticationTokenRefreshNeeded extends AuthenticationActions {
    readonly type = AuthActionType.AuthTokenNeedsRefresh;
}
