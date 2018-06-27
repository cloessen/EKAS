import { Action } from '@ngrx/store';
import { Kamerad, Overview } from '../../shared/interfaces';

export enum KameradenActionTypes {
  SET_ANWESENDE_KAMERADEN = '[Kameraden] Set anwesende Kameraden',
  SET_ANWESENDE_GWF = '[Kameraden] Set anwesende GWF',
  SET_ANWESENDE_OWF = '[Kameraden] Set anwesende OWF',
  SET_ANWESENDE_ZF = '[Kameraden] Set anwesende ZF',
  SET_OVERVIEW = '[Kameraden] Set Overview',
  SET_ALLE_KAMERADEN = '[Kameraden] Set alle Kameraden',
  SAVE_NEUEN_KAMERAD = '[Kameraden] Save neuen Kamerad',
  KAMERAD_BEARBEITEN = '[Kameraden] Kamerad bearbeiten'
}




export class SetAnwesendeKameraden implements Action {
  readonly type = KameradenActionTypes.SET_ANWESENDE_KAMERADEN;
  constructor(public payload: Kamerad[]) {}
}
export class SetAnwesendeGWF implements Action {
  readonly type = KameradenActionTypes.SET_ANWESENDE_GWF;
  constructor(public payload: Kamerad[]) {}
}
export class SetAnwesendeOWF implements Action {
  readonly type = KameradenActionTypes.SET_ANWESENDE_OWF;
  constructor(public payload: Kamerad[]) {}
}
export class SetAnwesendeZF implements Action {
  readonly type = KameradenActionTypes.SET_ANWESENDE_ZF;
  constructor(public payload: Kamerad[]) {}
}
export class SetAlleKameraden implements Action {
  readonly type = KameradenActionTypes.SET_ALLE_KAMERADEN;
  constructor (public payload: Kamerad[]) {}
}
export class SetNeuenKamerad implements Action {
  readonly type = KameradenActionTypes.SAVE_NEUEN_KAMERAD;
  constructor (public payload: Kamerad) {}
}
export class SetOverview implements Action {
  readonly type = KameradenActionTypes.SET_OVERVIEW;
  constructor (public payload: Overview) {}
}
export class KameradBearbeiten implements Action {
  readonly type = KameradenActionTypes.KAMERAD_BEARBEITEN;
  constructor (public payload: Kamerad) {}
}

export type KameradenActions =
  SetAnwesendeKameraden |
  SetAnwesendeGWF |
  SetAnwesendeOWF |
  SetAnwesendeZF |
  SetAlleKameraden |
  SetNeuenKamerad |
  SetOverview |
  KameradBearbeiten;
