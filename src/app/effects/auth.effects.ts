import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as authActions from '../actions/auth.actions';
import * as todoActions from '../actions/todo-actions';

@Injectable()
export class AuthEffects {

  private authUrl = environment.authUrl;

  // LoginSucceeded => LoadTodos
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      map(() => todoActions.loadTodos())
    )
  );

  // if they login successfully, take them to the dashboard
  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSucceeded),
      tap(() => this.router.navigate(['dashboard']))
    ), { dispatch: false }
  );

  // loginRequested => (loginSucceeded | loginFailed)
  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginRequested),
      switchMap((auth) => this.client.post<{ access_token: string }>(this.authUrl, auth.payload)
        .pipe(
          map(response => authActions.loginSucceeded({ payload: { username: auth.payload.username, token: response.access_token } })),
          catchError(err => of(authActions.loginFailed({ message: 'Could not Log You in' })))
        )
      )
    )
  );

  logoutRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutRequested),
      tap(() => this.router.navigate(['login']))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private client: HttpClient,
    private router: Router
  ) { }
}
