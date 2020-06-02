import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../department/department.model';
import { Doctor } from '../doctor/doctor.model';
import { Nurse } from '../nurse/nurse.model';
import { Patient } from '../patient/patient.model';
import { Store, select } from '@ngrx/store';
import {  Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectDepartments } from '../department/store/department.selector';
import { fetchDepartments } from '../department/store/department.action';
import { selectNurses } from '../nurse/store/nurse.selector';
import { fetchNurses } from '../nurse/store/nurse.action';
import { Admit, AppState } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admit',
  templateUrl: './admit.component.html',
  styleUrls: ['./admit.component.scss']
})
export class AdmitComponent implements OnInit {

  admitPatientFormGroup: FormGroup;
  department: Department[];
  doctor: Doctor[];
  nurse: Nurse[];
  patientBuffer: Patient[];
  depOptions = new Array();
  docOptions = new Array();
  nurseOptions = new Array();
  doctorBuffer = new Array();
  hideForm: boolean = false;
  
  admitDetails: Admit[] = [];
  
  
  private readonly unsubscribe = new Subject<void>();

  constructor(public store: Store<AppState>,
    public readonly router: Router,
    public userService:UserService) {

      this.store.pipe(select('patientComponent'), select('patients'))
      .subscribe(val => {
        this.patientBuffer = val; 
      });
  
      this.admitPatientFormGroup = new FormGroup({
        symptoms: new FormControl('', [Validators.pattern(/^[a-zA-Z ,]*$/), Validators.required]),
        depOption: new FormControl('select', Validators.required),
        docOption: new FormControl('', Validators.required),
        nurseOption: new FormControl('', Validators.required)
      });

      this.store.pipe(select(selectDepartments), takeUntil(this.unsubscribe)).subscribe(val => this.department = val);
      this.store.dispatch(fetchDepartments());
      this.store.pipe(select(selectNurses), takeUntil(this.unsubscribe)).subscribe(val => this.nurse = val);
      this.store.dispatch(fetchNurses());
  }

  ngOnInit(): void {

  }

  loadDepartment(){
    console.log(this.admitPatientFormGroup.get('depOption').value);
    this.depOptions.unshift(this.admitPatientFormGroup.get('depOption').value);


    let option = this.depOptions.toString();
    this.userService.getDepartmentOption(option)
      .subscribe(
        data=>{
          this.department = data;
        }
      )
  }

  emitDoctor(element: string){
    console.log(element);
    this.userService.getDoctorOption(element)
      .subscribe(
        data => {
          console.log(data);
          this.doctor = data;
        }
      )
  }


  loadDoctor(selectedDoctor: string){
    this.doctorBuffer.unshift(this.admitPatientFormGroup.get('docOption').value + '-' + selectedDoctor);
    console.log(this.doctorBuffer);

  }

  loadNurse(){
    this.nurseOptions.unshift(this.admitPatientFormGroup.get('nurseOption').value);
    let option = this.nurseOptions.toString();

    this.userService.getNurseOption(option)
      .subscribe(
        data=>{
          console.log(data);
          this.nurse = data;
        }
      )
  }

  admit(){
    console.log(this.patientBuffer);
    var admitObj= new Object({
      patient: this.patientBuffer,
      nurse: this.nurseOptions,
      doctor: this.doctorBuffer,
      department: this.depOptions,
      symptoms: this.admitPatientFormGroup.get('symptoms').value
    });
  
    this.userService.admit(admitObj)
      .subscribe(
        data=>{
          this.admitDetails = data;
          console.log(data);
          this.router.navigate(['/patient']);
        }
      )
    console.log(admitObj);
  }

}
