import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/Services/logger.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  @ViewChild('loginInputUsername') username: ElementRef;
  @ViewChild('loginInputPassword') password: ElementRef;

  rememberMe: boolean = false;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private logger: LoggerService
    ) { }

  ngOnInit() {
    if (this.authentication.isUserAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  onRememberMeToggled(event: MatSlideToggleChange) {
    this.rememberMe = event.checked;
  }

  onAccountLogin() {
    this.logger.write('attempting account login');
    const username: string = this.username.nativeElement.value;
    const password: string = this.password.nativeElement.value;

    this.logger.write(`Using username: '${username}' and password: '${password}' with cookie: ${this.rememberMe ? 'yes' : 'no'}`);
  }

  onSocialLogin(social: string) {
    this.logger.write(`attemptinbg social ${social} login`);
  }

}
