import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { PatientComponentAction, PatientComponentUrl, Patient } from '../patient.model';
import { setPatients, fetchPatients } from './patient.action';
import { AppState } from '../../user.model';


@Injectable()
export class PatientComponentEffect {

    fetchPatients$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PatientComponentAction.FETCH_PATIENTS),
            mergeMap(() => {
                const url = `${environment.apiBasePath}${PatientComponentUrl.FETCH_PATIENTS}`;
                return this.httpClient.get<Patient[]>(url).pipe(
                    map(val => setPatients({patients: val})),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    savePatient$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PatientComponentAction.SAVE_PATIENT),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${PatientComponentUrl.SAVE_PATIENT}`;
                return this.httpClient.post<Patient>(url, action.patient).pipe(
                    map(() => fetchPatients()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    updatePatient$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PatientComponentAction.UPDATE_PATIENT),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${PatientComponentUrl.UPDATE_PATIENT}`;
                return this.httpClient.put<Patient>(url, action.patient).pipe(
                    map(() => fetchPatients()),
                    catchError(() => EMPTY)
                );
            })
        )
    });


    filteredPatient$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PatientComponentAction.FILTERED_PATIENT),
            mergeMap((action: any) => {
               const url='http://localhost:8080/filterpatient?str='+action.text;
                console.log(url);
                return this.httpClient.get<Patient[]>(url).pipe(
                    map(val => setPatients({patients: val})),
                    catchError(() => EMPTY)
                );
            })
        )
    });


    constructor(private readonly actions$: Actions, private readonly store: Store<AppState>, private readonly httpClient: HttpClient) {}
}
