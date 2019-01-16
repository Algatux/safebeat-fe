import {Action} from '@ngrx/store';
import {Credentials} from '../../services/authentication/credentials.model';

export enum AuthActionTypes {
    Authenticate = 'LOGIN_AUTHENTICATE_CREDENTIALS',
}

export class AuthenticateCredentials implements Action {
    readonly type = AuthActionTypes.Authenticate;

    constructor(public payload: Credentials) { }

    static create(payload: Credentials): AuthenticateCredentials {
        return new AuthenticateCredentials(payload);
    }
}
