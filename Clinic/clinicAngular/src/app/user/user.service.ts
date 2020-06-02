import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AppState } from './user.model'
import { Store, select } from '@ngrx/store';
import { Department } from './department/department.model';
import { Nurse } from './nurse/nurse.model';
import { Doctor } from './doctor/doctor.model';

@Injectable()
export class UserService {
    
    url: string;
    patientParam: string;
    constructor(private readonly http: HttpClient,
        private readonly store: Store<AppState>) {
        this.url = 'http://localhost:8080';
    }

    getDepartment() {
        return this.http.get<Department[]>(this.url + '/departments', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getNurse() {
        return this.http.get<Nurse[]>(this.url + '/nurses', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    getDoctor() {
        return this.http.get<Doctor[]>(this.url + '/doctors', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
    
    
    getDepartmentOption(depName: string){

        return this.http.get<Department[]>(this.url + '/optiondepartment?name=' + depName, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });

    }

    getDoctorOption(depName: string){
        return this.http.get<Doctor[]>(this.url + '/optiondoctor?depName=' + depName, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    getNurseOption(nName: string){
        return this.http.get<Nurse[]>(this.url + '/optionnurse?name=' + nName, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
    }

    addDepartment(payload: any){
        return this.http.post<any>(this.url + '/doctor', payload);
    }

    admit(payload: any){
        return this.http.post<any>(this.url + '/admitpatient', payload);
    }

     getDetails(patientId: number) {
        return this.http.get<any>(this.url + '/detail/' + patientId, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
      }
   

}