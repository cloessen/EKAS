import * as fromUI from './Store/UI/ui.reducer';
import * as fromBasic from './Store/Basic/basic.reducer';
import * as fromKameraden from './Store/Kameraden/kameraden.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  ui: fromUI.State;
  basic: fromBasic.State;
  kameraden: fromKameraden.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  basic: fromBasic.basicReducer,
  kameraden: fromKameraden.kameradenReducer
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getBasicState = createFeatureSelector<fromBasic.State>('basic');
export const getCurrentFF = createSelector(getBasicState, fromBasic.getCurrentFF);

export const getKameradenState = createFeatureSelector<fromKameraden.State>('kameraden');
export const getAlleKameraden = createSelector(getKameradenState, fromKameraden.getAlleKameraden);
export const getAnwesendeKameraden = createSelector(getKameradenState, fromKameraden.getanwesendeKameraden);

