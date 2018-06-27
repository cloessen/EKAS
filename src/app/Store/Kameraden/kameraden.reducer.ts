import {
  KameradenActions,
  KameradenActionTypes
} from './kameraden.actions';
import {Kamerad, Overview} from '../../shared/interfaces';

export interface State {
  alleKameraden: Kamerad[];
  anwesendeKameraden: Kamerad[];
  anwesendeGWF: Kamerad[];
  anwesendeOWF: Kamerad[];
  anwesendeZF: Kamerad[];
  overview: Overview;
}

const initialState: State = {
  alleKameraden: [],
  anwesendeKameraden: [],
  anwesendeGWF: [],
  anwesendeOWF: [],
  anwesendeZF: [],
  overview: null
};

export function kameradenReducer(state = initialState, action: KameradenActions) {
  switch (action.type) {
    case  KameradenActionTypes.SET_ALLE_KAMERADEN:
      return {
        ...state,
        alleKameraden: action.payload
      };
    case KameradenActionTypes.SET_ANWESENDE_KAMERADEN:
      return {
        ...state,
        anwesendeKameraden: action.payload
      };
    case KameradenActionTypes.SET_ANWESENDE_GWF:
      return {
        ...state,
        anwesendeGWF: action.payload
      };
    case KameradenActionTypes.SET_ANWESENDE_OWF:
      return {
        ...state,
        anwesendeOWF: action.payload
      };
    case KameradenActionTypes.SET_ANWESENDE_ZF:
      return {
        ...state,
        anwesendeZF: action.payload
      };
    case KameradenActionTypes.SAVE_NEUEN_KAMERAD:
      return {
        ...state,
        // anwesendeKameraden: action.payload TODO: BEarbeiten
      };
    case KameradenActionTypes.SET_OVERVIEW:
      return {
        ...state,
        overview: action.payload
      };
    case KameradenActionTypes.KAMERAD_BEARBEITEN:
      return {
        ...state,
        // anwesendeKameraden: action.payload TODO: BEarbeiten
      };
    default : {
      return state;
    }
  }
}

export const getAlleKameraden = (state: State) => state.alleKameraden;
export const getanwesendeKameraden = (state: State) => state.anwesendeKameraden;
export const getanwesendeGWF = (state: State) => state.anwesendeGWF;
export const getanwesendeOWF = (state: State) => state.anwesendeOWF;
export const getanwesendeZF = (state: State) => state.anwesendeZF;
export const getOverview = (state: State) => state.overview;
