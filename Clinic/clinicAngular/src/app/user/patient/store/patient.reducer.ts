import { PatientComponentState, PatientInputState } from '../patient.model';
import { createReducer, on } from '@ngrx/store';
import { setPatients, filteredPatient } from './patient.action';

export const patientComponentInitialState: PatientComponentState = {
    patients: []
};

export const patientComponentReducer = createReducer(patientComponentInitialState,
    on(setPatients, (state, action) => ({...state, patients: action.patients}))
);

export const InputInitialState: PatientInputState = {
    text: ''
};

export const inputReducer = createReducer(InputInitialState,
    on(filteredPatient, (state, action) => {
        return {
            ...state,
            text: action.text
        };
    })
);