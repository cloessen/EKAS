import { UIActions, UIActionTypes } from './ui.actions';
import { UIError } from '../../shared/interfaces';

export interface State {
  isLoading: boolean;
  hasError: UIError;
}

const initialState: State = {
  isLoading: false,
  hasError: null
};

export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case UIActionTypes.START_LOADING :
      return {
        ...state,
        isLoading: true
      };
    case UIActionTypes.STOP_LOADING :
      return {
        ...state,
        isLoading: false
      };
    case UIActionTypes.SET_ERROR:
      return{
        ...state,
        hasError: action.payload
      };
    case UIActionTypes.RESET_ERROR:
      return {
        ...state,
        hasError: null
      };
    default : {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getHasError = (state: State) => state.hasError;
