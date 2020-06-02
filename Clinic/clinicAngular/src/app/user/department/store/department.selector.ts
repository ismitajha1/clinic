import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentComponentState } from '../department.model';

export const selectDepartmentComponentState = createFeatureSelector<DepartmentComponentState>('departmentComponent');
export const selectDepartments = createSelector(selectDepartmentComponentState, state => state && state.departments);
