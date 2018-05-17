import { BasicActions, SET_CURRENT_FF } from './basic.actions';

export interface State {
  currentFF: string;
}

const initialState: State = {
  currentFF: null
};

export function basicReducer(state = initialState, action: BasicActions) {
  switch (action.type) {
    case SET_CURRENT_FF :
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
