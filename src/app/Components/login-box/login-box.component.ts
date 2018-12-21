import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { LoggerService } from '../../Services/logger.service';
import { Credentials } from '../../Services/Authentication/credentials.model';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  credentials: Credentials;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private logger: LoggerService
    ) {
      this.credentials = new Credentials;
    }

  ngOnInit() {
    if (this.authentication.isUserAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.logger.write('attempting account login');
    this.authentication.authenticate(this.credentials);
    // auth with http request
  }

  onSocialLogin(social: string) {
    this.logger.write(`attemptinbg social ${social} login`);
    this.authentication.tryGoogleSignIn();
  }

}
