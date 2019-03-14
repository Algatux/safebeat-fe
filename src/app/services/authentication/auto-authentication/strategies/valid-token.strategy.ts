import {AutoAuthenticationInterface} from './strategy.interface';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../store';
import {AuthenticatedWithToken} from '../../../../store/actions';
import {TokenStorageService} from '../../token/token-storage.service';
import {Logger} from '../../../logger.service';

export class ValidTokenStrategy implements AutoAuthenticationInterface {

    constructor(
        private store: Store<AuthState>
    ) {}

    canAuthenticate(): boolean {

        const token = TokenStorageService.getToken();

        return null !== token && false === token.isExpired();

    }

    authenticate() {
        Logger.write('Auto authenticating with stored authToken');

        this.store.dispatch(new AuthenticatedWithToken(TokenStorageService.getToken()));
    }

}
