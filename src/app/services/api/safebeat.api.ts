import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ConfigurationService} from '../configuration.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class SafebeatApi {

    protected constructor(
        protected http: HttpClient
    ) {}

    protected route(url: string): string {
        return `${ConfigurationService.getConfiguration().appBaseUrl}${url}`;
    }

    protected getStandardHeaders(authToken: string): HttpHeaders {

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Jwt-Auth': `Bearer ${authToken}`
        });
    }
}
