import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AuthActionType, AuthenticateCredentials, Authenticated, AuthenticateFailed} from '../actions';
import {ConfigurationService} from '../../services/configuration.service';
import {JwtParserService} from '../../services/authentication/jwt-parser.service';
import {Router} from '@angular/router';
import {AUTH_TOKEN_KEY, USER_TOKEN_DATA_KEY} from '../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationEffects {

    @Effect()
    authentication$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionType.Authenticating),
        mergeMap((action: AuthenticateCredentials) =>

                this.http.post <{ token: string }>(
                    `${ConfigurationService.getConfiguration().appBaseUrl}/login`,
                    action.payload.toJson(),
                    {
                        headers: new HttpHeaders({'Content-Type': 'application/json'}),
                        observe: 'response',
                        responseType: 'json'
                    }
                ).pipe(
                    map((resp: HttpResponse<{ token: string }>) => new Authenticated(JwtParserService.parseTokenData(resp.body.token))),
                    catchError(() => of(new AuthenticateFailed()))
                )
        )
    );

    @Effect()
    authenticated$: Observable<Promise<boolean>> = this.actions$.pipe(
        ofType(AuthActionType.Authenticated),
        map((action: Authenticated) => {

            localStorage.setItem(AUTH_TOKEN_KEY, action.payload.authToken);
            localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(
                {
                    username: action.payload.username,
                    expiration: action.payload.expiration,
                    issued: action.payload.issued
                }
            ));

            return this.router.navigate(['']);
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) {
    }
}
