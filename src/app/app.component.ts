import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthStoreStatus} from './store/reducers/authentication.reducer';
import {AutoAuthenticationService} from './services/authentication/auto-authentication/auto-authentication.service';
import {Store} from '@ngrx/store';
import {AuthState} from './store';
import {AuthenticationInit} from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  isUserAuthenticated: boolean = false;

  constructor(
    private store: Store<AuthState>,
    private authentication: AuthenticationService,
    private autoAuthentication: AutoAuthenticationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthenticationInit());
    this.authentication
      .isAuthenticationInState(AuthStoreStatus.Authenticated)
      .subscribe((state: boolean) => {
        this.isUserAuthenticated = state;
      });
    this.autoAuthentication.authenticate();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
