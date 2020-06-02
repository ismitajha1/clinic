import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorComponentState } from '../doctor.model';

export const selectDoctorComponentState = createFeatureSelector<DoctorComponentState>('doctorComponent');
export const selectDoctors = createSelector(selectDoctorComponentState, state => state && state.doctors);

