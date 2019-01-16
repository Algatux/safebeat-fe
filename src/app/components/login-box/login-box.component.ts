import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Logger} from '../../services/logger.service';
import {Credentials} from '../../services/authentication/credentials.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store';
import {AuthenticationInit} from '../../store/actions';
import {AuthStoreStatus} from '../../store/reducers/authentication.reducer';

@Component({
    selector: 'app-login-box',
    templateUrl: './login-box.component.html',
    styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit, OnDestroy {

    credentials: Credentials;
    authenticating: boolean;

    private authSubscription: Subscription | null = null;

    constructor(
        private authentication: AuthenticationService,
        private router: Router,
        private store: Store<AuthState>
    ) {
        this.credentials = new Credentials;
    }

    ngOnInit() {
        this.checkAuthentication();
        this.store.dispatch(new AuthenticationInit());
    }

    onSubmit() {
        Logger.write('attempting account login');

        this.authSubscription = this.authentication.authenticate(this.credentials)
            .subscribe((state: AuthState) => {
                console.log('AuthState.status: ' + state.status);

                this.authenticating = AuthStoreStatus.Authenticating === state.status;
            });
    }

    onSocialLogin(social: string) {
        Logger.write(`attempting social ${social} login`);
        this.authentication.tryGoogleSignIn();
    }

    private checkAuthentication(): void {
        if (this.authentication.isUserAuthenticated()) {
            this.router.navigate(['']);
        }
    }

    ngOnDestroy(): void {
        this.authSubscription = null;
    }

}
