import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

import { Credentials } from './credentials.model';
import { ConfigurationService } from 'src/app/Services/configuration.service';
import { JwtParserService, Token } from './jwt-parser.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './authentication.reducer';
import { Login } from './authentication.actions';

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
    private httpClient: HttpClient,
    private jwtParser: JwtParserService,
    private store: Store<AuthState>
  ) { }

  public static retrieveSavedToken(): Token | null {
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
      this.token = AuthenticationService.retrieveSavedToken();
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

  public authenticate(credentials: Credentials): Subscription {
    return this.httpClient.post <{token: string}> (
      `${ConfigurationService.getConfiguration().appBaseUrl}/api/login`,
      credentials.toJson(), {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        responseType: 'json'
      }
    ).subscribe((resp: HttpResponse<{token: string}>) => {
        this.token = this.jwtParser.parseTokenData(resp.body.token);
        this.store.dispatch(new Login(this.token));
        localStorage.setItem(AUTH_TOKEN_KEY, resp.body.token);
        localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(this.token));
    });
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private isTokenExpired(): boolean {
    // must check timezone too
    return null === this.token || this.token.expiration <= new Date();
  }
}
