import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Observer, Subscription, timer} from 'rxjs';

import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {subMinutes, subSeconds} from 'date-fns';

import {Credentials} from './model/credentials.model';
import {
  Authenticated,
  AuthenticateFailed, AuthenticateRefreshTokenObtained,
  AuthenticationInit,
} from '../../store/actions';
import {AuthState, selectAuthState} from '../../store';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';
import {Logger} from '../logger.service';
import {Token} from './model/auth-token.model';
import {SecurityApi} from '../api/security.api';
import {HttpResponse} from '@angular/common/http';
import {TokenStorageService} from './token/token-storage.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean = false;
  private rememberMe: boolean = false;
  private token: Token | null = null;
  private refreshToken: string | null = null;

  private authObserver: Observable<AuthState>;
  private authExpirationObserver: Observable<number>;
  private authExpirationSubscriber: Subscription;

  private authenticatedStatusObservable: Observable<boolean>;
  private authenticatedStatusSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private securityService: SecurityApi,
    private store: Store<AuthState>,
    private router: Router,
  ) {
    this.init();
  }

  setToken(token: Token): void {
    this.token = token;
    this.setAuthenticationSubscriber();
  }

  setRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  private init() {
    this.authObserver = this.store.pipe(select<AuthState>(selectAuthState));

    this.authenticatedStatusObservable = this
      .isAuthenticationInState(AuthStoreStatus.Authenticated);

    this.authenticatedStatusSubscription = this.authenticatedStatusObservable
      .subscribe((authenticated: boolean) => {

        Logger.condWrite(
          'Auth observer -> Authenticated = ' + (authenticated ? 'yes' : 'no'),
          authenticated !== this.authenticated
        );
        this.authenticated = authenticated;
      });
  }

  private setAuthenticationSubscriber(): void {
    Logger.write('Setting auth token expiration observer');
    this.authExpirationObserver = timer(
      subSeconds(
        this.token.expiration,
        environment.preAuthExpirationTtl
      )
    );

    if (this.authExpirationSubscriber instanceof Subscription) {
      this.authExpirationSubscriber.unsubscribe();
    }

    this.authExpirationSubscriber = this.authExpirationObserver
      .subscribe(() => {
        Logger.write('Token is expiring, trying refresh');
        this.refreshAuthToken();
      });
  }

  public refreshAuthToken() {
    this.securityService
      .getFreshToken(this.token.authToken, this.refreshToken)
      .subscribe(
        (response: HttpResponse<{ token: string }>) => {
          Logger.write([
            'old : ' + this.token.authToken,
            'new : ' + response.body.token,
            'are different' + (this.token.authToken !== response.body.token) ? 'Y' : 'N',
          ]);
          this.storeAuthToken(response.body.token);
          this.store.dispatch(new Authenticated(this.token));
        }
      );
  }

  public isAuthenticationInState(state: string): BehaviorSubject<boolean> {

    return Observable.create((observer: Observer<boolean>) => {

      this.authObserver.subscribe((storeState: AuthState) => {
        observer.next(storeState.status === state);
      });
    });

  }

  public isUserAuthenticated(): boolean {

    return this.token instanceof Token && !this.token.isExpired();
  }

  public authenticate(credentials: Credentials): void {
    this.rememberMe = credentials.rememberMe;

    this.securityService
      .login(credentials)
      .subscribe(
        (tokenResponse: HttpResponse<{ token: string }>) => {
          this.authenticated = true;
          this.storeAuthToken(tokenResponse.body.token);
          this.store.dispatch(new Authenticated(this.token));
          this.retrieveRefreshToken();
          this.router.navigate(['']);

        },
        (error: any) => {
          this.clearLoginData(true);
          this.store.dispatch(new AuthenticateFailed());
        }
      );
  }

  private storeAuthToken(authToken: string) {
    this.setToken(new Token(authToken));
    TokenStorageService.storeToken(this.token);
  }

  public retrieveRefreshToken() {
    this.securityService
      .getRefreshToken(this.token.authToken)
      .subscribe(
        (refreshResponse: HttpResponse<{ refreshToken: string }>) => {
          this.refreshToken = refreshResponse.body.refreshToken;
          this.setRefreshToken(this.refreshToken);
          TokenStorageService.storeRefreshToken(this.refreshToken);
          this.store.dispatch(new AuthenticateRefreshTokenObtained(this.refreshToken));
        },
        (error: any) => {
          this.clearLoginData(true);
          this.store.dispatch(new AuthenticateFailed());
        }
      );
  }

  private clearLoginData(deleteRefreshToken: boolean = false) {
    this.authenticated = false;
    this.token = null;
    this.refreshToken = null;
    TokenStorageService.clear(deleteRefreshToken);
  }

  public logout(): void {
    this.clearLoginData(!this.rememberMe);
    this.router.navigate(['/login']);
    this.store.dispatch(new AuthenticationInit());
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public getAuthToken(): string {
    return this.token.authToken;
  }
}
