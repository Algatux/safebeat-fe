import {Action} from '@ngrx/store';
import {Credentials} from '../../services/authentication/credentials.model';
import {Token} from '../../services/authentication/jwt-parser.service';

export enum AuthActionType {
    Initialize = 'LOGIN_AUTHENTICATE_INIT',
    Authenticating = 'LOGIN_AUTHENTICATE_CREDENTIALS',
    Authenticated = 'LOGIN_AUTHENTICATE_SUCCESSFUL',
    AuthenticateFailed = 'LOGIN_AUTHENTICATE_FAILED'
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

export class Authenticated extends AuthenticationActions {
    readonly type = AuthActionType.Authenticated;

    constructor(public payload: Token) {
        super(payload);
    }
}
