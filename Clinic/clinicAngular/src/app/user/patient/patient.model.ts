export interface Patient {
    id: number;
    name: string;
    address: string;
    dob: string;
    gender: string;
    phone: string;
}

export interface PatientComponentState {
    patients: Patient[];
}

export interface PatientInputState {
    text: string;
}
export enum PatientComponentAction {
    FETCH_PATIENTS = '[Patient Component] Fetch Patients',
    SET_PATIENTS = '[Patient Component] Set Patients',
    SAVE_PATIENT = '[Patient Component] Save Patient',
    UPDATE_PATIENT = '[Patient Component] Update Patient',
    FILTERED_PATIENT = '[Patient Component] Filtered Patient'
}

export enum PatientComponentUrl {
    FETCH_PATIENTS = '/patients',
    SAVE_PATIENT= '/patients',
    UPDATE_PATIENT = '/patients'
}
