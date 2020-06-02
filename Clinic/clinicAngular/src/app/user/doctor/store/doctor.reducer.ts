import { DoctorComponentState } from '../doctor.model';

import { createReducer, on } from '@ngrx/store';
import { setDoctors } from './doctor.action';

export const doctorComponentInitialState: DoctorComponentState = {
    doctors: []
};

export const doctorComponentReducer = createReducer(doctorComponentInitialState,
    on(setDoctors, (state, action) => ({...state, doctors: action.doctors}))
);
