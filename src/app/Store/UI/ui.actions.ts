import { Action } from '@ngrx/store';

export enum UIActionTypes {
  START_LOADING = '[UI] Start Loading',
  STOP_LOADING = '[UI] Stop Loading',
  SET_ERROR = '[UI] Set Error',
  RESET_ERROR = '[UI] Reset Error'
}

export class StartLoading implements Action {
  readonly type = UIActionTypes.START_LOADING;
}
export class StopLoading implements Action {
  readonly type = UIActionTypes.STOP_LOADING;
}
export class SetError implements Action {
  readonly type = UIActionTypes.SET_ERROR;
  constructor(public payload: any) {}
}
export class ResetError implements Action {
  readonly type = UIActionTypes.RESET_ERROR;
}

export type UIActions =
  StartLoading |
  StopLoading |
  SetError |
  ResetError;
