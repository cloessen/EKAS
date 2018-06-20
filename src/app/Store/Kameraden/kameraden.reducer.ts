import { KameradenActions, SET_ALLE_KAMERADEN, SET_ANWESENDE_KAMERADEN, SAVE_NEUEN_KAMERAD, KAMERAD_BEARBEITEN} from './kameraden.actions';
import { Kamerad } from '../../shared/interfaces';

export interface State {
  alleKameraden: Kamerad[];
  anwesendeKameraden: Kamerad[];
}

const initialState: State = {
  alleKameraden: [],
  anwesendeKameraden: []
};

export function kameradenReducer(state = initialState, action: KameradenActions) {
  switch (action.type) {
    case  SET_ALLE_KAMERADEN:
      return {
        ...state,
        alleKameraden: action.payload
      };
    case SET_ANWESENDE_KAMERADEN:
      return {
        ...state,
        anwesendeKameraden: action.payload
      };
      case SAVE_NEUEN_KAMERAD:
      return {
        ...state,
        // anwesendeKameraden: action.payload TODO: BEarbeiten
      };
      case KAMERAD_BEARBEITEN:
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
