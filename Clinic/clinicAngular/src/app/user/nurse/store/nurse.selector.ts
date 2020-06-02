import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NurseComponentState } from '../nurse.model';

export const selectNurseComponentState = createFeatureSelector<NurseComponentState>('nurseComponent');
export const selectNurses = createSelector(selectNurseComponentState, state => state && state.nurses);
