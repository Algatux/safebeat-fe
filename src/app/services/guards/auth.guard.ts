import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {Logger} from '../logger.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private authentication: AuthenticationService,
        private router: Router
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        Logger.write('AuthGuard#canActivate called');

        if (false === this.authentication.isUserAuthenticated()) {
            Logger.write('User not authenticated, redirecting to login');
            this.router.navigate(['/login']);

            return false;
        }

        return true;
    }
}
