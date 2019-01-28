import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
    AuthActionType,
    AuthenticateCredentials,
    Authenticated,
    AuthenticateFailed, AuthenticateRefreshTokenObtained,
    AuthenticationActions,
    AuthenticationInit
} from '../actions';
import {JwtParserService} from '../../services/authentication/jwt-parser.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/authentication/token-storage.service';
import {SecurityApi} from '../../services/api/security.api';

@Injectable()
export class AuthenticationEffects {

    @Effect()
    authentication$: Observable<AuthenticationActions> = this.actions$.pipe(
        ofType(AuthActionType.Authenticating),
        mergeMap((action: AuthenticateCredentials) =>

            this.securityApi
                .login(action.payload)
                .pipe(
                    map((resp: HttpResponse<{ token: string }>) => {

                            const token = JwtParserService.parseTokenData(resp.body.token);
                            TokenStorageService.storeToken(token);

                            return new Authenticated(token);
                        }
                    ),
                    catchError(() => of(new AuthenticateFailed()))
                )
        )
    );

    @Effect({dispatch: false})
    authenticated$: Observable<AuthenticationActions> = this.actions$.pipe(
        ofType(AuthActionType.Authenticated),
        mergeMap(() => {

                this.router.navigate(['']);

                return this.securityApi
                    .getRefreshToken()
                    .pipe(
                        map((resp: HttpResponse<{ refreshToken: string }>) => {
                                return new AuthenticateRefreshTokenObtained(resp.body);
                            },
                            catchError(() => of(new AuthenticateFailed()))
                        )
                    );
            }
        )
    );

    @Effect()
    authenticationLogout$: Observable<AuthenticationActions> = this.actions$.pipe(
        ofType(AuthActionType.AuthenticationLogout),
        map(() => {

            TokenStorageService.clear();

            this.router.navigate(['/login']);

            return new AuthenticationInit();
        })
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private securityApi: SecurityApi
    ) {
    }
}
