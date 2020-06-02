import { createAction, props } from '@ngrx/store';
import { PatientComponentAction, Patient } from '../patient.model';

export const fetchPatients = createAction(PatientComponentAction.FETCH_PATIENTS);
export const setPatients = createAction(PatientComponentAction.SET_PATIENTS, props<{patients: Patient[]}>());
export const savePatient = createAction(PatientComponentAction.SAVE_PATIENT, props<{patient: Patient}>());
export const updatePatient = createAction(PatientComponentAction.UPDATE_PATIENT, props<{patient: Patient}>());
export const filteredPatient = createAction(PatientComponentAction.FILTERED_PATIENT, props<{text: String}>());


