import { Action } from '@ngrx/store';
import { Kamerad } from '../../shared/interfaces';

export const SET_ANWESENDE_KAMERADEN = '[Kameraden] Set anwesende Kameraden';
export const SET_ALLE_KAMERADEN = '[Kameraden] Set alle Kameraden';
export const SAVE_NEUEN_KAMERAD = '[Kameraden] Save neuen Kamerad';
export const KAMERAD_BEARBEITEN = '[Kameraden] Kamerad bearbeiten';

export class SetAnwesendeKameraden implements Action {
  readonly type = SET_ANWESENDE_KAMERADEN;
  constructor(public payload: Kamerad[]) {}
}
export class SetAlleKameraden implements Action {
  readonly type = SET_ALLE_KAMERADEN;
  constructor (public payload: Kamerad[]) {}
}
export class SetNeuenKamerad implements Action {
  readonly type = SAVE_NEUEN_KAMERAD;
  constructor (public payload: Kamerad) {}
}
export class KameradBearbeiten implements Action {
  readonly type = KAMERAD_BEARBEITEN;
  constructor (public payload: Kamerad) {}
}

export type KameradenActions = SetAnwesendeKameraden | SetAlleKameraden | SetNeuenKamerad | KameradBearbeiten;
