import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Observer, Subscription, timer} from 'rxjs';

import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {subMinutes} from 'date-fns';

import {Credentials} from './credentials.model';
import {AuthenticateCredentials, AuthenticatedWithToken, AuthenticationLogout, AuthenticationTokenRefreshNeeded} from '../../store/actions';
import {Token} from './jwt-parser.service';
import {AuthState, selectAuthState} from '../../store';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';
import {TokenStorageService} from './token-storage.service';
import {Logger} from '../logger.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private authenticated: boolean = false;
    private rememberMe: boolean = false;
    private token: Token | null = null;

    private authObserver: Observable<AuthState>;
    private authExpirationObserver: Observable<number>;

    private authenticatedStatusObservable: Observable<boolean>;
    private authenticatedStatusSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private store: Store<AuthState>
    ) {
        this.init();
    }

    private init() {
        this.authObserver = this.store.pipe(select<AuthState>(selectAuthState));

        this.authenticatedStatusObservable = this
            .isAuthenticationInState(AuthStoreStatus.Authenticated);

        this.authenticatedStatusSubscription = this.authenticatedStatusObservable
            .subscribe((authenticated: boolean) => {

                Logger.write('Authenticated = ' + (authenticated ? 'yes' : 'no'));

                this.authenticated = authenticated;

                if (this.authenticated && null === this.token) {
                    this.retrieveStoredToken(false);
                    this.authExpirationObserver = timer(subMinutes(this.token.expiration, 1));
                    this.authExpirationObserver.subscribe(() => {
                        Logger.write('Token is expiring');
                        this.store.dispatch(new AuthenticationTokenRefreshNeeded());
                    });
                }

            });
    }

    public retrieveStoredToken(logIn: boolean): void {
        if (null === this.token) {
            this.token = TokenStorageService.getToken();
        }

        if (logIn && !this.isTokenExpired()) {
            Logger.write('Authenticating with token');
            this.store.dispatch(new AuthenticatedWithToken(this.token));
        }
    }

    public isAuthenticationInState(state: string): Observable<boolean> {

        return Observable.create((observer: Observer<boolean>) => {

            this.authObserver.subscribe((storeState: AuthState) => {
                observer.next(storeState.status === state);
            });
        });

    }

    public isUserAuthenticated(): boolean {
        if (null === this.token) {
            this.retrieveStoredToken(true);
        }

        return !this.isTokenExpired();
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

    private isTokenExpired(): boolean {
        // must check timezone too
        return null === this.token || this.token.expiration <= new Date();
    }

    public getToken(): Token | null {

        return this.token;
    }

    public getRefreshToken(): string | null {

        return TokenStorageService.getRefreshToken();
    }
}
