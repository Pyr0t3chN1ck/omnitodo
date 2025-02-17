import { createAction, props } from '@ngrx/store';

// Command - initiator
export const loginRequested = createAction(
  '[todos auth] login requested',
  props<{ payload: { username: string, password: string } }>()
);

// The Success
export const loginSucceeded = createAction(
  '[todos auth] login succeeded',
  props<{ payload: { username: string, token: string } }>()
);

// The Failure
export const loginFailed = createAction(
  '[todos auth] login failed',
  props<{ message: string }>()
);

export const logoutRequested = createAction(
  '[todos auth] logout requested'
);
