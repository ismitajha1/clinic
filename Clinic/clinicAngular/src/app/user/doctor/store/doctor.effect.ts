import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { DoctorComponentAction, DoctorComponentUrl, Doctor, DoctorList } from '../doctor.model';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { setDoctors, fetchDoctors } from './doctor.action';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../user.model';

@Injectable()
export class DoctorComponentEffect {

    fetchDoctors$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DoctorComponentAction.FETCH_DOCTORS),
            mergeMap(() => {
                const url = `${environment.apiBasePath}${DoctorComponentUrl.FETCH_DOCTORS}`;
                return this.httpClient.get<DoctorList[]>(url).pipe(
                    map(val => setDoctors({doctors: val})),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    saveDoctor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DoctorComponentAction.SAVE_DOCTOR),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${DoctorComponentUrl.SAVE_DOCTOR}`;
                console.log(url);
                return this.httpClient.post<Doctor>(url,action.doctor).pipe(
                    map(() => fetchDoctors()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    updateDoctor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DoctorComponentAction.UPDATE_DOCTOR),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${DoctorComponentUrl.UPDATE_DOCTOR}`;
                return this.httpClient.put<Doctor>(url, action.doctor).pipe(
                    map(() => fetchDoctors()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    deleteDoctor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DoctorComponentAction.DELETE_DOCTOR),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${DoctorComponentUrl.DELETE_DOCTOR}/${action.doctor.id}`;
                return this.httpClient.delete<Doctor>(url).pipe(
                    map(() => fetchDoctors()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    constructor(private readonly actions$: Actions, private readonly store: Store<AppState>, private readonly httpClient: HttpClient) {}
}
