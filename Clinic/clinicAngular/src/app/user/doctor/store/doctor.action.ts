import { createAction, props } from '@ngrx/store';
import { DoctorComponentAction, Doctor, DoctorList } from '../doctor.model';

export const fetchDoctors = createAction(DoctorComponentAction.FETCH_DOCTORS);
export const setDoctors = createAction(DoctorComponentAction.SET_DOCTORS, props<{doctors: DoctorList[]}>());
export const saveDoctor = createAction(DoctorComponentAction.SAVE_DOCTOR, props<{doctor: Doctor}>());
export const updateDoctor = createAction(DoctorComponentAction.UPDATE_DOCTOR, props<{doctor: Doctor}>());
export const deleteDoctor = createAction(DoctorComponentAction.DELETE_DOCTOR, props<{doctor: Doctor}>());
