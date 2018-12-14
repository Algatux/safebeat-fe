import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean = false;

  constructor(private authService: AuthService) { }

  public isUserAuthenticated(): boolean {
    return this.authenticated;
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
