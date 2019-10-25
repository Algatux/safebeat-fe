import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {SafebeatApi} from './safebeat.api';
import {Credentials} from '../authentication/model/credentials.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

import {AuthenticationService} from '../authentication/authentication.service';
import {Wallet, WalletList, WalletResponse} from '../../models/api/wallet.model';

@Injectable()
export class WalletApi extends SafebeatApi {

  constructor(
    protected http: HttpClient,
    protected auth: AuthenticationService
  ) {
    super(http);
  }

  list(): Observable<HttpResponse<WalletList>> {

    return this.http.get<WalletList>(
      this.route('/wallet'),
      {
        headers: this.getStandardHeaders(this.auth.getAuthToken()),
        observe: 'response',
        responseType: 'json'
      }
    );
  }

  wallet(walletId: number): Observable<HttpResponse<WalletResponse>> {

    return this.http.get<WalletResponse>(
      this.route(`/wallet/${walletId}`),
      {
        headers: this.getStandardHeaders(this.auth.getAuthToken()),
        observe: 'response',
        responseType: 'json'
      }
    );
  }
}
