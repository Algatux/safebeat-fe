import { Action } from '@ngrx/store';
import { Token } from './jwt-parser.service';

export enum AuthActionsTypes {
  Login = 'auth_login',
  LoginFromCokie = 'auth_login_cookie',
  Logout = 'auth_logout',
}

export class Login implements Action {
  readonly type = AuthActionsTypes.Login;

  constructor(public token: Token) {}
}

export class LoginFromCokie implements Action {
  readonly type = AuthActionsTypes.LoginFromCokie;

  constructor(public token: Token) {}
}

export class Logout implements Action {
  readonly type = AuthActionsTypes.Logout;
}
