import { Injectable } from '@angular/core';

import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

import { Credentials } from './credentials.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {AuthenticateCredentials} from '../../Store/Actions/authentication.actions';
import {Token} from './jwt-parser.service';
import {AuthState} from '../../Store';

const AUTH_TOKEN_KEY = 'authToken';
const USER_TOKEN_DATA_KEY = 'userTokenData';
const AUTH_CHECK_POLLING_RATE = 500;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: Token | null = null;

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>
  ) { }

  public static retrieveStoredToken(): Token | null {
    if (null === localStorage.getItem(AUTH_TOKEN_KEY)) {
      return null;
    }

    let userTokenData: string | Token | null = localStorage.getItem(USER_TOKEN_DATA_KEY);
    userTokenData = null !== userTokenData ? (JSON.parse(userTokenData) as Token) : null;

    if (null === userTokenData) {
      return null;
    }

    userTokenData.expiration = new Date(userTokenData.expiration);
    userTokenData.issued = new Date(userTokenData.issued);

    return userTokenData;
  }

  public isUserAuthenticated(): boolean {
    if (null === this.token) {
      this.token = AuthenticationService.retrieveStoredToken();
    }

    return !this.isTokenExpired();
  }

  public observeAuthentication(): Observable<boolean> {
    const $this = this;
    return Observable.create(observer =>  {

      const interval = setInterval(() => {
        observer.next($this.isUserAuthenticated());
      }, AUTH_CHECK_POLLING_RATE);

      return () => clearInterval(interval);
    });
  }

  public authenticate(credentials: Credentials) {

    const authSubscription = this.store
        .select<AuthState>((state: AuthState) => state )
        .subscribe((state: AuthState) => {
          console.log(2);
          console.log(state);
        });

    console.log(1);
    this.store.dispatch(AuthenticateCredentials.create(credentials));

    // return this.httpClient.post <{token: string}> (
    //   `${ConfigurationService.getConfiguration().appBaseUrl}/api/login`,
    //   credentials.toJson(), {
    //     headers: new HttpHeaders({'Content-Type': 'application/json'}),
    //     observe: 'response',
    //     responseType: 'json'
    //   }
    // ).subscribe((resp: HttpResponse<{token: string}>) => {
    //     this.token = this.jwtParser.parseTokenData(resp.body.token);
    //     this.store.dispatch(new Login(this.token));
    //     localStorage.setItem(AUTH_TOKEN_KEY, resp.body.token);
    //     localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(this.token));
    // });
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private isTokenExpired(): boolean {
    // must check timezone too
    return null === this.token || this.token.expiration <= new Date();
  }
}
