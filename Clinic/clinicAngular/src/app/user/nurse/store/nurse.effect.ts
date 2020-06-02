import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseComponentAction, NurseComponentUrl, Nurse } from '../nurse.model';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment'
import { setNurses, fetchNurses } from './nurse.action';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../user.model';

@Injectable()
export class NurseComponentEffect {

    fetchNurses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NurseComponentAction.FETCH_NURSES),
            mergeMap(() => {
                const url = `${environment.apiBasePath}${NurseComponentUrl.FETCH_NURSES}`;
                return this.httpClient.get<Nurse[]>(url).pipe(
                    map(val => setNurses({nurses: val})),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    saveNurse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NurseComponentAction.SAVE_NURSE),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${NurseComponentUrl.SAVE_NURSE}`;
                return this.httpClient.post<Nurse>(url, action.nurse).pipe(
                    map(() => fetchNurses()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    updateNurse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NurseComponentAction.UPDATE_NURSE),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${NurseComponentUrl.UPDATE_NURSE}`;
                return this.httpClient.put<Nurse>(url, action.nurse).pipe(
                    map(() => fetchNurses()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    deleteNurse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NurseComponentAction.DELETE_NURSE),
            mergeMap((action: any) => {
                const url = `${environment.apiBasePath}${NurseComponentUrl.DELETE_NURSE}/${action.nurse.id}`;
                return this.httpClient.delete<Nurse>(url).pipe(
                    map(() => fetchNurses()),
                    catchError(() => EMPTY)
                );
            })
        )
    });

    constructor(private readonly actions$: Actions, private readonly store: Store<AppState>, private readonly httpClient: HttpClient) {}
}
