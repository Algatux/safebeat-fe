import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication/authentication.service';
import {Logger} from '../../services/logger.service';
import {Credentials} from '../../services/authentication/model/credentials.model';

@Component({
    selector: 'app-login-box',
    templateUrl: './login-box.component.html',
    styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit, OnDestroy {

    credentials: Credentials;
    authenticating: boolean;

    constructor(
        private authentication: AuthenticationService,
        private router: Router,
    ) {
        this.credentials = new Credentials;
    }

    ngOnInit() {
        this.checkAuthentication();
    }

    onSubmit() {
        Logger.write('attempting account login');
        this.authentication.authenticate(this.credentials);
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

    ngOnDestroy(): void {}
}
