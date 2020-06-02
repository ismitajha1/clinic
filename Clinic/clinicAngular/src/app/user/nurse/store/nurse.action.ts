import { createAction, props } from '@ngrx/store';
import { NurseComponentAction, Nurse } from '../nurse.model';

export const fetchNurses = createAction(NurseComponentAction.FETCH_NURSES);
export const setNurses = createAction(NurseComponentAction.SET_NURSES, props<{nurses: Nurse[]}>());
export const saveNurse = createAction(NurseComponentAction.SAVE_NURSE, props<{nurse: Nurse}>());
export const updateNurse = createAction(NurseComponentAction.UPDATE_NURSE, props<{nurse: Nurse}>());
export const deleteNurse = createAction(NurseComponentAction.DELETE_NURSE, props<{nurse: Nurse}>());
