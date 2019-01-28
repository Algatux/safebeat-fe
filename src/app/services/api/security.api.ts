import {HttpHeaders, HttpResponse} from '@angular/common/http';

import {SafebeatApi} from './safebeat.api';
import {Credentials} from '../authentication/credentials.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SecurityApi extends SafebeatApi {

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
            {
                device: 'MacBookPro152018',
                osVersion: 'mac-os-x-14',
                browser: 'chrome'
            },
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'X-Jwt-Auth': `Bearer ${this.auth.getToken().authToken}`
                }),
                observe: 'response',
                responseType: 'json'
            }
        );
    }
}
