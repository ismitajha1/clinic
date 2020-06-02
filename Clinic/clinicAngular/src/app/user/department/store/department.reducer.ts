import { DepartmentComponentState } from '../department.model';
import { createReducer, on } from '@ngrx/store';
import { setDepartments } from './department.action';

export const departmentComponentInitialState: DepartmentComponentState = {
    departments: []
};

export const departmentComponentReducer = createReducer(departmentComponentInitialState,
    on(setDepartments, (state, action) => ({...state, departments: action.departments}))
);
