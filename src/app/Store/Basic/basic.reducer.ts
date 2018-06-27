import { BasicActions, BasicActionTypes } from './basic.actions';

export interface State {
  currentFF: string;
}

const initialState: State = {
  currentFF: null
};

export function basicReducer(state = initialState, action: BasicActions) {
  switch (action.type) {
    case BasicActionTypes.SET_CURRENT_FF:
      return {
        ...state,
        currentFF : action.payload
      };
    default : {
      return state;
    }
  }
}

export const getCurrentFF = (state: State) => state.currentFF;
