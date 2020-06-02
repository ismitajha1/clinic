import { createAction, props } from '@ngrx/store';
import { DepartmentComponentAction, Department } from '../department.model';

export const fetchDepartments = createAction(DepartmentComponentAction.FETCH_DEPARTMENTS);
export const setDepartments = createAction(DepartmentComponentAction.SET_DEPARTMENTS, props<{departments: Department[]}>());
export const saveDepartment = createAction(DepartmentComponentAction.SAVE_DEPARTMENT, props<{department: Department}>());
export const updateDepartment = createAction(DepartmentComponentAction.UPDATE_DEPARTMENT, props<{department: Department}>());
