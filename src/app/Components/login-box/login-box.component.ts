import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.scss']
})
export class LoginBoxComponent implements OnInit {

  @ViewChild('loginInputUsername') username: ElementRef;
  @ViewChild('loginInputPassword') password: ElementRef;

  rememberMe: boolean = false;

  constructor() { }

  ngOnInit() { }

  onRememberMeToggled(event: MatSlideToggleChange) {
    this.rememberMe = event.checked;
  }

  onAccountLogin() {
    console.log('attempting account login');
    const username: string = this.username.nativeElement.value;
    const password: string = this.password.nativeElement.value;

    console.log(`Using username: '${username}' and password: '${password}' with cookie: ${this.rememberMe ? 'yes' : 'no'}`);
  }

  onSocialLogin(social: string) {
    console.log(`attemptinbg social ${social} login`);
  }

}
