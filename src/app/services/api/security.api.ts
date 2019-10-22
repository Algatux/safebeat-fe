import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {SafebeatApi} from './safebeat.api';
import {Credentials} from '../authentication/model/credentials.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class SecurityApi extends SafebeatApi {

    constructor(
        protected http: HttpClient,
        protected auth: AuthenticationService,
        private device: DeviceDetectorService
    ) {
        super(http, auth);
    }

    private getDeviceInfo(): Object {

        return {
            device: this.device.device,
            osVersion: this.device.os_version,
            browser: this.device.browser
        };
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

    getRefreshToken(): Observable<HttpResponse<{ refreshToken: string }>> {

        return this.http.post<{ refreshToken: string }>(
            this.route('/refresh-token'),
            this.getDeviceInfo(),
            {
                headers: this.getStandardHeaders(),
                observe: 'response',
                responseType: 'json'
            }
        );
    }

    getFreshToken(): Observable<HttpResponse<{ token: string }>> {
        console.log('ref token :', this.auth.getRefreshToken());
        return this.http.post<{ token: string }>(
            this.route('/new-token'),
            {
                ... this.getDeviceInfo(),
                refreshToken: this.auth.getRefreshToken()
            },
            {
                headers: this.getStandardHeaders(),
                observe: 'response',
                responseType: 'json'
            }
        );
    }
}
