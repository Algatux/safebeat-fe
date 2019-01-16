import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Logger } from '../../services/logger.service';
import { Credentials } from '../../services/authentication/credentials.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit, OnDestroy {

  credentials: Credentials;

  private authSubscription: Subscription | null = null;

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
    this.authSubscription = this.authentication.authenticate(this.credentials);
      // .add(() => { this.checkAuthentication(); });
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
