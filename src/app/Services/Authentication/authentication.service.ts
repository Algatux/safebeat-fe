import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Credentials } from './credentials.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from 'src/app/Configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private conf: ConfigurationService
    ) { }

  public isUserAuthenticated(): boolean {
    return this.authenticated;
  }

  public authenticate(credentials: Credentials): void {
    const authUrl = `${this.conf.getConfiguration().appBaseUrl}/api/login`;

    const httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      responseType: 'json'
    };

    this.httpClient.post<any>(authUrl, credentials.toJson(), httpOptions)
      .subscribe((data) => {
          console.log(data);
      });
  }

  public tryGoogleSignIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
