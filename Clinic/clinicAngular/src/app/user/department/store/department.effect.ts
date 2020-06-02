import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { DepartmentComponentAction, DepartmentComponentUrl, Department } from '../department.model';
import { setDepartments, fetchDepartments } from './department.action';
import { AppState } from '../../user.model';

@Injectable()
export class DepartmentComponentEffect {

    fetchDepartments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentComponentAction.FETCH_DEPARTMENTS),
            mergeMap(() => {
                const url = `${environment.apiBasePath}${DepartmentComponentUrl.FETCH_DEPARTMENTS}`;
                return this.httpClient.get<Department[]>(url).pipe(
                    map(val => setDepartments({departments: val})),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    saveDepartment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentComponentAction.SAVE_DEPARTMENT),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${DepartmentComponentUrl.SAVE_DEPARTMENT}`;
                return this.httpClient.post<Department>(url, action.department).pipe(
                    map(() => fetchDepartments()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    updateDepartment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DepartmentComponentAction.UPDATE_DEPARTMENT),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${DepartmentComponentUrl.UPDATE_DEPARTMENT}`;
                return this.httpClient.put<Department>(url, action.department).pipe(
                    map(() => fetchDepartments()),
                    catchError(() => EMPTY)
                );
            })
        )
    });


    constructor(private readonly actions$: Actions, private readonly store: Store<AppState>, private readonly httpClient: HttpClient) {}
}
