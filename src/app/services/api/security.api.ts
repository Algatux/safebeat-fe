import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {SafebeatApi} from './safebeat.api';
import {Credentials} from '../authentication/model/credentials.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Injectable()
export class SecurityApi extends SafebeatApi {

  constructor(
    protected http: HttpClient,
    private device: DeviceDetectorService,
  ) {
    super(http);
  }

  login(credentials: Credentials): Observable<HttpResponse<{ token: string }>> {

    return this.http.post<{ token: string }>(
      this.route('/login'),
      credentials.toJson(),
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
        observe: 'response',
        responseType: 'json'
      }
    );
  }

  getRefreshToken(authToken: string): Observable<HttpResponse<{ refreshToken: string }>> {

    return this.http.post<{ refreshToken: string }>(
      this.route('/refresh-token'),
      this.getDeviceInfo(),
      {
        headers: this.getStandardHeaders(authToken),
        observe: 'response',
        responseType: 'json'
      }
    );
  }

  getFreshToken(authToken: string, refreshToken: string): Observable<HttpResponse<{ token: string }>> {
    console.log('ref token :', refreshToken);
    return this.http.post<{ token: string }>(
      this.route('/new-token'),
      {
        ...this.getDeviceInfo(),
        refreshToken: refreshToken,
      },
      {
        headers: this.getStandardHeaders(authToken),
        observe: 'response',
        responseType: 'json'
      }
    );
  }

  private getDeviceInfo(): Object {

    return {
      device: this.device.device,
      osVersion: this.device.os_version,
      browser: this.device.browser
    };
  }
}
