import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';

import {Credentials} from './credentials.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {AuthenticateCredentials, AuthenticatedWithToken} from '../../store/actions';
import {Token} from './jwt-parser.service';
import {AuthState, selectAuthState} from '../../store';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';
import {TokenStorageService} from './token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private token: Token | null = null;
    private authenticatedSubject

    constructor(
        private authService: AuthService,
        private store: Store<AuthState>
    ) {}

    private retrieveStoredToken(): Token | null {
        const token = TokenStorageService.getToken();

        if (!this.isTokenExpired()) {
            this.store.dispatch(new AuthenticatedWithToken(this.token));
        }

        return token;
    }

    public isUserAuthenticated(): boolean {
        if (null === this.token) {
            this.token = this.retrieveStoredToken();
        }

        return !this.isTokenExpired();
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
