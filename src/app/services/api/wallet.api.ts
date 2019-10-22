import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {SafebeatApi} from './safebeat.api';
import {Credentials} from '../authentication/model/credentials.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

import {AuthenticationService} from '../authentication/authentication.service';
import {Wallet, WalletList} from '../../models/api/wallet.model';

@Injectable()
export class WalletApi extends SafebeatApi {

    constructor(
        protected http: HttpClient,
        protected auth: AuthenticationService
    ) {
        super(http, auth);
    }

    list(): Observable<HttpResponse<WalletList>> {

        return this.http.get<WalletList>(
            this.route('/wallet'),
            {
                headers: this.getStandardHeaders(),
                observe: 'response',
                responseType: 'json'
            }
        );
    }
}
