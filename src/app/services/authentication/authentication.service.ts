import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Observer, timer} from 'rxjs';

import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {subMinutes} from 'date-fns';

import {Credentials} from './credentials.model';
import {AuthenticateCredentials, AuthenticatedWithToken, AuthenticationLogout} from '../../store/actions';
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
    private token: Token | null = null;
    private authObserver: Observable<AuthState>;
    private authExpirationObserver: Observable<number>;

    constructor(
        private authService: AuthService,
        private store: Store<AuthState>
    ) {
        this.authObserver = this.store.pipe(select<AuthState>(selectAuthState));
        this.init();
    }

    private init() {
        this
            .isAuthenticationInState(AuthStoreStatus.Authenticated)
            .subscribe((authenticated: boolean) => {
                this.authenticated = authenticated;

                if (this.authenticated && null !== this.token) {
                    this.retrieveStoredToken(false);
                    this.authExpirationObserver = timer(subMinutes(this.token.expiration, 1));
                    this.authExpirationObserver.subscribe(() => {
                        Logger.write('Token is expiring');
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
        this.store.dispatch(new AuthenticateCredentials(credentials));
    }

    public logout(): void {
        this.token = null;
        this.store.dispatch(new AuthenticationLogout());
    }

    public tryGoogleSignIn() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    private isTokenExpired(): boolean {
        // must check timezone too
        return null === this.token || this.token.expiration <= new Date();
    }

    public getToken(): Token | null {

        this.retrieveStoredToken(false);

        console.log(this.token.authToken);

        return this.token;
    }
}
