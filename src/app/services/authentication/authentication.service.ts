import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';

import {Credentials} from './credentials.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {AuthenticateCredentials} from '../../store/actions';
import {Token} from './jwt-parser.service';
import {AuthState, selectAuthState} from '../../store';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';

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
    ) {
    }

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
        return Observable.create(observer => {

            const interval = setInterval(() => {
                observer.next($this.isUserAuthenticated());
            }, AUTH_CHECK_POLLING_RATE);

            return () => clearInterval(interval);
        });
    }

    public authenticate(credentials: Credentials): Observable<AuthState> {

        const authObserver = this.store
            .pipe(
                select<AuthState>(selectAuthState),
                filter<AuthState>(
                    (state: AuthState) => -1 !== [
                        AuthStoreStatus.Authenticating,
                        AuthStoreStatus.Authenticated,
                        AuthStoreStatus.AuthenticateFailed
                    ].indexOf(state.status)
                )
            );

        authObserver.subscribe((state: AuthState) => {

            if (AuthStoreStatus.Authenticated === state.status) {
                localStorage.setItem(AUTH_TOKEN_KEY, state.authToken);
                localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(
                    {
                        username: state.username,
                        expiration: state.expiration,
                        issued: state.issued
                    }
                ));
            }


        });

        this.store.dispatch(new AuthenticateCredentials(credentials));

        return authObserver;
    }

    public tryGoogleSignIn() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    private isTokenExpired(): boolean {
        // must check timezone too
        return null === this.token || this.token.expiration <= new Date();
    }
}
