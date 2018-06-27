import * as fromUI from './UI/ui.reducer';
import * as fromBasic from './Basic/basic.reducer';
import * as fromKameraden from './Kameraden/kameraden.reducer';

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
export const getHasError = createSelector(getUiState, fromUI.getHasError);

export const getBasicState = createFeatureSelector<fromBasic.State>('basic');
export const getCurrentFF = createSelector(getBasicState, fromBasic.getCurrentFF);

export const getKameradenState = createFeatureSelector<fromKameraden.State>('kameraden');
export const getAlleKameraden = createSelector(getKameradenState, fromKameraden.getAlleKameraden);
export const getAnwesendeKameraden = createSelector(getKameradenState, fromKameraden.getanwesendeKameraden);
export const getAnwesendeGWF = createSelector(getKameradenState, fromKameraden.getanwesendeGWF);
export const getAnwesendeOWF = createSelector(getKameradenState, fromKameraden.getanwesendeOWF);
export const getAnwesendeZF = createSelector(getKameradenState, fromKameraden.getanwesendeZF);
export const getOverview = createSelector(getKameradenState, fromKameraden.getOverview);

