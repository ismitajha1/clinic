import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientComponentState } from '../patient.model';

export const selectPatientComponentState = createFeatureSelector<PatientComponentState>('patientComponent');
export const selectPatients = createSelector(selectPatientComponentState, state => state && state.patients);
