import {AuthenticationService} from '../authentication.service';
import {AutoAuthenticationInterface} from './strategies/strategy.interface';
import {ValidTokenStrategy} from './strategies/valid-token.strategy';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../store';
import {Injectable} from '@angular/core';
import {RefreshTokenStrategy} from './strategies/refresh-token.strategy';

@Injectable({
    providedIn: 'root'
})
export class AutoAuthenticationService {

    private strategies: AutoAuthenticationInterface[] = [];

    constructor(private auth: AuthenticationService, private store: Store<AuthState>) {
        this.strategies.push(new ValidTokenStrategy(this.store));
        this.strategies.push(new RefreshTokenStrategy(this.store));
    }

    authenticate() {
        this.strategies.forEach((strategy: AutoAuthenticationInterface) => {
            if (strategy.canAuthenticate()) {
                strategy.authenticate();
            }
        });
    }
}
