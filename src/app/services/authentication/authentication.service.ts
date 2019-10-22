import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Observer, Subscription, timer} from 'rxjs';

import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {subMinutes} from 'date-fns';

import {Credentials} from './model/credentials.model';
import {AuthenticateCredentials, AuthenticationLogout, AuthenticationTokenRefreshNeeded} from '../../store/actions';
import {AuthState, selectAuthState} from '../../store';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';
import {Logger} from '../logger.service';
import {Token} from './model/auth-token.model';
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
    private store: Store<AuthState>
  ) {
    console.log('auth service init');
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

        // if (this.authenticated && this.token instanceof Token && 'string' === typeof this.refreshToken) {
        //   this.setAuthenticationSubscriber();
        // }

      });
  }

  private setAuthenticationSubscriber(): void {
    if (this.authExpirationSubscriber instanceof Subscription) {
      return;
    }

    Logger.write('Setting auth token expiration observer');

    this.authExpirationObserver = timer(
      subMinutes(
        this.token.expiration,
        5 // environment.preAuthExpirationTtl / 60
      )
    );

    this.authExpirationSubscriber = this.authExpirationObserver.subscribe(() => {
      Logger.write('Token is expiring, trying refresh');
      this.store.dispatch(new AuthenticationTokenRefreshNeeded());
    });
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
    this.store.dispatch(new AuthenticateCredentials(credentials));
  }

  public logout(): void {
    this.token = null;
    this.store.dispatch(new AuthenticationLogout({deleteRefresh: !this.rememberMe}));
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  public getToken(): Token | null {

    return this.token;
  }

  public getRefreshToken(): string | null {

    return this.refreshToken;
  }
}
