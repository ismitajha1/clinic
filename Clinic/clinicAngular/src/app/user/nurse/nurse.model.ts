export interface Nurse {
    id: number;
    nName: string;
    licenseNo: string;
}

export interface NurseComponentState {
    nurses: Nurse[];
}

export enum NurseComponentAction {
    FETCH_NURSES = '[Nurse Component] Fetch Nurses',
    SET_NURSES = '[Nurse Component] Set Nurses',
    SAVE_NURSE = '[Nurse Component] Save Nurse',
    UPDATE_NURSE = '[Nurse Component] Update Nurse',
    DELETE_NURSE = '[Nurse Component] Delete Nurse'
}

export enum NurseComponentUrl {
    FETCH_NURSES = '/nurses',
    SAVE_NURSE = '/nurses',
    UPDATE_NURSE = '/nurses',
    DELETE_NURSE = '/nurses'
}
