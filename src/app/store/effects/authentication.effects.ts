import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AuthActionType, AuthenticateCredentials, Authenticated, AuthenticateFailed} from '../actions';
import {ConfigurationService} from '../../services/configuration.service';
import {JwtParserService} from '../../services/authentication/jwt-parser.service';

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

            //     .subscribe((resp: HttpResponse<{token: string}>) => {
            //     this.token = this.jwtParser.parseTokenData(resp.body.token);
            //     this.store.dispatch(new Login(this.token));
            //     localStorage.setItem(AUTH_TOKEN_KEY, resp.body.token);
            //     localStorage.setItem(USER_TOKEN_DATA_KEY, JSON.stringify(this.token));
            // });


            // this.http.post('/auth', action.payload).pipe(
            //     // If successful, dispatch success action with result
            //     map(data => (new Authenticated({}))),
            //     // If request fails, dispatch failed action
            //     catchError(() => of({ type: 'LOGIN_FAILED' }))
            // )
        )
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient
    ) {
    }
}
