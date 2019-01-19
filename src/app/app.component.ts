import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthState, selectAuthState} from './store';
import {select, Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';
import {AuthStoreStatus} from './store/reducers/authentication.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isUserAuthenticated: boolean;

    constructor(
        private store: Store<AuthState>,
        private authentication: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        this.isUserAuthenticated = this.authentication.isUserAuthenticated();

        this.store
            .pipe(
                select<AuthState>(selectAuthState),
                filter<AuthState>(
                    (state: AuthState) => -1 !== [
                        AuthStoreStatus.Authenticated,
                        AuthStoreStatus.NotAuthenticated
                    ].indexOf(state.status)
                )
            )
            .subscribe((state: AuthState) => {
                this.isUserAuthenticated = state.status === AuthStoreStatus.Authenticated;
            });
    }

}
