export interface Doctor {
    id: number;
    dName: string;
    nmcNo: string;
}

export interface Doctor2 {
    id: number;
    dName: string;
    nmcNo: number;
}

export interface DoctorList{
    doctorid: number;
    doctorname: string;
    nmcNo: number;
    departmentname: string;
}

export interface DoctorComponentState {
    doctors: DoctorList[];
}

export interface InputState {
    text: string;
}

export enum DoctorComponentAction {
    FETCH_DOCTORS = '[Doctor Component] Fetch Doctors',
    SET_DOCTORS = '[Doctor Component] Set Doctors',
    SAVE_DOCTOR = '[Doctor Component] Save Doctor',
    UPDATE_DOCTOR = '[Doctor Component] Update Doctor',
    DELETE_DOCTOR = '[Doctor Component] Delete Doctor',
    FILTERED_DOCTOR = '[Doctor Component] Filtered Doctor'
}

export enum DoctorComponentUrl {
    FETCH_DOCTORS = '/doctors',
    SAVE_DOCTOR = '/doctors',
    UPDATE_DOCTOR = '/doctors',
    DELETE_DOCTOR = '/doctors'
}
