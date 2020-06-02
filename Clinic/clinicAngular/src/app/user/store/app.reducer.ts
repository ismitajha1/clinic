import {ActionReducerMap} from '@ngrx/store';
import { AppState } from '../user.model';
import { patientComponentReducer } from '../patient/store/patient.reducer';
import { nurseComponentReducer } from '../nurse/store/nurse.reducer';
import { doctorComponentReducer } from '../doctor/store/doctor.reducer';
import { departmentComponentReducer } from '../department/store/department.reducer';

export const appReducer: ActionReducerMap<AppState> = {
    patientComponent: patientComponentReducer,
    nurseComponent: nurseComponentReducer,
    doctorComponent: doctorComponentReducer,
    departmentComponent: departmentComponentReducer 
};
