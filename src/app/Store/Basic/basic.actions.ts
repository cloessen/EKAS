import { Action } from '@ngrx/store';

export const SET_CURRENT_FF = '[Basic] Set Current FF';
// export const STOP_LOADING = '[UI] Stop Loading';

export class SetCurrentFF implements Action {
  readonly type = SET_CURRENT_FF;
  // TODO: WORK ON SETTING THE PAYLOAD!!!!!!!!!!!!
  constructor(public payload: string){}
}

export type BasicActions = SetCurrentFF;
