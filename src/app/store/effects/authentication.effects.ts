import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of, timer} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AuthActionType, AuthenticateCredentials, Authenticated, AuthenticateFailed} from '../actions';
import {ConfigurationService} from '../../services/configuration.service';
import {JwtParserService} from '../../services/authentication/jwt-parser.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/authentication/token-storage.service';
import {Logger} from '../../services/logger.service';

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

    @Effect({dispatch: false})
    authenticated$: Observable<Promise<boolean>> = this.actions$.pipe(
        ofType(AuthActionType.Authenticated),
        map((action: Authenticated) => {

            TokenStorageService.storeToken(action.payload);

            timer(action.payload.expiration)
                .subscribe((number: number) => {
                Logger.write(number);
            });

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
