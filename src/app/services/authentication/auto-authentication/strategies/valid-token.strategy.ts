import {AutoAuthenticationInterface} from './strategy.interface';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../store';
import {Authenticated, AuthenticatedWithToken} from '../../../../store/actions';
import {TokenStorageService} from '../../token/token-storage.service';
import {Logger} from '../../../logger.service';
import {AuthenticationService} from '../../authentication.service';

export class ValidTokenStrategy implements AutoAuthenticationInterface {

    constructor(
        private store: Store<AuthState>,
        private authService: AuthenticationService,
    ) {}

    canAuthenticate(): boolean {

        const token = TokenStorageService.getToken();

        return null !== token && false === token.isExpired();

    }

    authenticate() {
        Logger.write('Auto authenticating with stored authToken');

        this.store.dispatch(new AuthenticatedWithToken(TokenStorageService.getToken()));
        this.authService.setToken(TokenStorageService.getToken());
        this.authService.retrieveRefreshToken();
        this.store.dispatch(new Authenticated(TokenStorageService.getToken()));
    }

}
