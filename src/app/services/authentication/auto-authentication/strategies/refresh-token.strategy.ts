import {AutoAuthenticationInterface} from './strategy.interface';
import {AuthenticationService} from '../../authentication.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../store';
import {AuthenticateRefreshTokenObtained} from '../../../../store/actions';
import {TokenStorageService} from '../../token/token-storage.service';
import {Logger} from '../../../logger.service';
import {Token} from '../../model/auth-token.model';

export class RefreshTokenStrategy implements AutoAuthenticationInterface {

  constructor(
    private store: Store<AuthState>,
    private authenticationService: AuthenticationService
  ) {}

  canAuthenticate(): boolean {

    const authToken = TokenStorageService.getToken();
    const refreshToken = TokenStorageService.getRefreshToken();

    return null !== refreshToken && authToken instanceof Token && true === authToken.isExpired();
  }

  authenticate() {
    Logger.write('Auto authenticating with stored refreshToken');

    const refreshToken: string = TokenStorageService.getRefreshToken();
    this.authenticationService.setToken(TokenStorageService.getToken());
    this.authenticationService.setRefreshToken(refreshToken);
    this.store.dispatch(new AuthenticateRefreshTokenObtained(refreshToken));
    this.authenticationService.refreshAuthToken();
  }

}
