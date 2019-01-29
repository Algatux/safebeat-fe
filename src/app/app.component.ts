import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthStoreStatus} from './store/reducers/authentication.reducer';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    isUserAuthenticated: boolean = false;

    private authSubscription: Subscription;

    constructor(private authentication: AuthenticationService) {}

    ngOnInit(): void {
        this.authSubscription = this.authentication
            .isAuthenticationInState(AuthStoreStatus.Authenticated)
            .subscribe((authenticated: boolean) => {
                this.isUserAuthenticated = authenticated;
            });
    }

    ngOnDestroy(): void {
        console.log('destroy');
        this.authSubscription = null;
    }

}
