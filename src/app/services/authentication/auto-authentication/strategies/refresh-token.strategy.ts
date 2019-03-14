import {AutoAuthenticationInterface} from './strategy.interface';
import {AuthenticationService} from '../../authentication.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../store';
import {AuthenticatedWithToken, AuthenticateRefreshTokenObtained, AuthenticationTokenRefreshNeeded} from '../../../../store/actions';
import {TokenStorageService} from '../../token/token-storage.service';
import {Logger} from '../../../logger.service';

export class RefreshTokenStrategy implements AutoAuthenticationInterface {

    constructor(
        private store: Store<AuthState>
    ) {}

    canAuthenticate(): boolean {

        const authToken = TokenStorageService.getToken();
        const refreshToken = TokenStorageService.getRefreshToken();

        return null !== refreshToken && (null === authToken || true === authToken.isExpired());

    }

    authenticate() {
        Logger.write('Auto authenticating with stored refreshToken');

        const refreshToken = TokenStorageService.getRefreshToken();

        this.store.dispatch(new AuthenticateRefreshTokenObtained({refreshToken}));
        this.store.dispatch(new AuthenticationTokenRefreshNeeded(refreshToken));
    }

}
