import { Component, OnInit } from '@angular/core';
import { Column } from '../common/table/table.model';
import { Patient } from './patient.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState, Admit } from '../user.model';
import { selectPatients } from './store/patient.selector';
import { takeUntil } from 'rxjs/operators';
import { fetchPatients, savePatient, updatePatient, setPatients } from './store/patient.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

 
  readonly columns: Column[] = [
    {name: 'name', label: 'Name'},
    {name: 'address', label: 'Address'},
    {name: 'dob', label: 'Date Of Birth'},
    {name: 'gender', label: 'Gender'},
    {name: 'phone', label: 'Phone'}
  ];

  readonly patientFormControlKeys = {
    name: 'name',
    address: 'address',
    dob: 'dob',
    gender: 'gender',
    phone: 'phone'
  };

  admits: Admit[] = [];
  patients: Patient[] = [];
  selectedPatient: Patient;
  formModalActive = false;
  tableActive = true;
  deleteModalActive = false;
  patientFormGroup: FormGroup;

  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly store: Store<AppState>,
    private readonly router: Router, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.preparePatientFormGroup();
    this.store.pipe(select(selectPatients), takeUntil(this.unsubscribe)).subscribe(val => this.patients = val);
    this.store.dispatch(fetchPatients());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddBtnClick(): void {
    this.selectedPatient = null;
    this.formModalActive = true;
    this.tableActive = false;
    this.patientFormGroup.patchValue({
      [this.patientFormControlKeys.name]: '',
      [this.patientFormControlKeys.address]: '',
      [this.patientFormControlKeys.dob]: '',
      [this.patientFormControlKeys.gender]: '',
      [this.patientFormControlKeys.phone]: ''
    });
  }

  onEditBtnClick(patient: Patient): void {
    this.selectedPatient = patient;
    this.formModalActive = true;
    this.tableActive = false;
    this.patientFormGroup.patchValue({
      [this.patientFormControlKeys.name]: patient.name,
      [this.patientFormControlKeys.address]: patient.address,
      [this.patientFormControlKeys.dob]: patient.dob,
      [this.patientFormControlKeys.gender]: patient.gender,
      [this.patientFormControlKeys.phone]: patient.phone
    });
  }

  onAdmitBtnClick(value: Patient[]) {
    console.log(value);
    this.store.dispatch(setPatients({ patients: value }))
    this.router.navigate(['/admit']);
  }
  
  onDetailsBtnClick(patientId: number) {
    console.log(patientId);
    this.router.navigate(['/details', patientId]);
  }

  onFormSubmitBtnClick(): void {
    if (this.selectedPatient == null) {
      this.store.dispatch(savePatient({patient: {...this.patientFormGroup.value, id: null}}));
    } else {
      this.store.dispatch(updatePatient({patient: {...this.patientFormGroup.value, id: this.selectedPatient.id}}));
    }
    this.selectedPatient = null;
    this.formModalActive = false;
    this.tableActive = true;
  }

  onFormCancelBtnClick(): void {
    this.selectedPatient = null;
    this.formModalActive = false;
    this.tableActive = true;
  }

  private preparePatientFormGroup(): void {
    this.patientFormGroup = this.formBuilder.group({
      [this.patientFormControlKeys.name]: this.formBuilder.control('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50), Validators.required]),
      [this.patientFormControlKeys.address]: this.formBuilder.control('', [Validators.pattern(/^[a-zA-Z0-9, -]*$/), Validators.maxLength(100), Validators.required]),
      [this.patientFormControlKeys.dob]: this.formBuilder.control('', Validators.required),
      [this.patientFormControlKeys.gender]: this.formBuilder.control('', Validators.required),
      [this.patientFormControlKeys.phone]: this.formBuilder.control('', [Validators.pattern(/^[0-9]{10}$/), Validators.required])

    });
  }
}

