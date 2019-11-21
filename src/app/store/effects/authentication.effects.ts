import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  AuthActionType,
  AuthenticationActions,
  AuthenticationInit, AuthenticationLogout
} from '../actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  onAuthenticationLogout$: Observable<AuthenticationActions> = this.actions$.pipe(
    ofType(AuthActionType.Logout),
    map((action: AuthenticationLogout) => {

      this.router.navigate(['/login']);

      return new AuthenticationInit();
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {
  }
}


