import { NurseComponentState } from '../nurse.model';

import { createReducer, on } from '@ngrx/store';
import { setNurses } from './nurse.action';

export const nurseComponentInitialState: NurseComponentState = {
    nurses: []
};

export const nurseComponentReducer = createReducer(nurseComponentInitialState,
    on(setNurses, (state, action) => ({...state, nurses: action.nurses}))
);
