import { Component, OnInit } from '@angular/core';
import { Column } from '../common/table/table.model';
import { Doctor, DoctorList } from './doctor.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../user.model';
import { selectDoctors } from './store/doctor.selector';
import { takeUntil } from 'rxjs/operators';
import { fetchDoctors } from './store/doctor.action';
import { Department } from '../department/department.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { selectDepartments } from '../department/store/department.selector';
import { fetchDepartments } from '../department/store/department.action';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  readonly columns: Column[] = [
    { name: 'doctorname', label: 'Doctor Name' },
    { name: 'nmcNo', label: 'Publication Year' },
    { name: 'authorname', label: 'Authors' }
  ];
  readonly doctorFormControlKeys = {
    id: 'id',
    dName: 'dName',
    nmcNo: 'nmcNo'
  };

  doctors: DoctorList[] = [];
  selectedDoctor: Doctor;
  selectedDoctorId: number;
  formModalActive = false;
  deleteModalActive = false;
  tableActive = true;
  newDepartmentFormModalActive = false;
  addFormModalActive = false;
  showContainer = true;
  doctorFormGroup: FormGroup;
  departmentlist: Department[];
  selecteddepartmentslist: [] = [];
  

  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder,
    private readonly httpClient: HttpClient, private readonly router: Router) { }

  ngOnInit(): void {
    this.prepareDoctorFormGroup();
    this.store.pipe(select(selectDoctors), takeUntil(this.unsubscribe)).subscribe(val => this.doctors = val);
    this.store.dispatch(fetchDoctors());
    this.store.pipe(select(selectDepartments), takeUntil(this.unsubscribe)).subscribe(val => this.departmentlist = val);
    this.store.dispatch(fetchDepartments());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddBtnClick(): void {
    this.selectedDoctor = null;
    this.addFormModalActive = true;
    this.tableActive =false;
    this.showContainer = false;
    this.doctorFormGroup.patchValue({
      [this.doctorFormControlKeys.dName]: '',
      [this.doctorFormControlKeys.nmcNo]: ''

    });
  }

  onEditBtnClick(doctorid: string): void {
    this.formModalActive = true;
    this.tableActive = false;
    this.showContainer = false;
    const params = new HttpParams().set('doctorid', doctorid);
    this.httpClient.get<Doctor>('http://localhost:8080/finddoctors', { params }).subscribe(val => {
      this.doctorFormGroup.patchValue({
        [this.doctorFormControlKeys.id]: val.id,
        [this.doctorFormControlKeys.dName]: val.dName,
        [this.doctorFormControlKeys.nmcNo]: val.nmcNo
      });
    });
  }

  onDeleteBtnClick(doctorid: number): void {
    this.selectedDoctorId = doctorid;
    this.deleteModalActive = true;
  }

  onAddDepartmentsBtnClick(idDepartment:number){
    this.router.navigate(['doctordepartment'],{ queryParams: { id:idDepartment } });
  }

  onFormSubmitBtnClick(): void {
    if (this.selectedDoctor == null) {
      const selectedDepartments = this.doctorFormGroup.get('items').value;
      let params = new HttpParams();
      selectedDepartments.forEach(val => {
        params = params.append('departments' , val.id);
      });
      this.httpClient.post<Doctor>('http://localhost:8080/doctors',this.doctorFormGroup.value, { params })
        .subscribe(result => {
          this.selectedDoctor = null;
          this.addFormModalActive = false;
          this.showContainer = true;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/doctor']));
        });
    }
    else {
     this.httpClient.put<Doctor>('http://localhost:8080/doctors', {...this.doctorFormGroup.value, id: this.selectedDoctor.id})
        .subscribe(result => {
          this.selectedDoctor = null;
          this.formModalActive = false;
          this.showContainer= true;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/doctor']));
        });
      }
  }

  onFormCancelBtnClick(): void {
    this.selectedDoctor = null;
    this.formModalActive = false;
    this.addFormModalActive = false;
    this.tableActive = true;
    this.showContainer= true;
  }

  onDeleteConfirm(): void {
    const url = 'http://localhost:8080/doctors/'+this.selectedDoctorId;
    this.httpClient.delete<any>(url).subscribe(result => {
      this.deleteModalActive = false;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/doctor']));
    });
   }

  onDeleteReject(): void {
    this.selectedDoctor = null;
    this.deleteModalActive = false;
  }

  private prepareDoctorFormGroup(): void {
    this.doctorFormGroup = this.formBuilder.group({
      items: this.formBuilder.array([this.createItem()]),
      [this.doctorFormControlKeys.id]: this.formBuilder.control(''),
      [this.doctorFormControlKeys.dName]: this.formBuilder.control('',[Validators.pattern(/^[a-zA-Z ]*$/),Validators.maxLength(20),Validators.required]),
      [this.doctorFormControlKeys.nmcNo]: this.formBuilder.control('',[Validators.pattern(/^[a-zA-Z0-9 ]*$/),Validators.required]),


    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: '',
    });
  }

  addDepartments(): void {
    this.items.push(this.createItem());
  }

  removeDepartment(index) {
    this.items.removeAt(index);
  }

  get items() {
    return this.doctorFormGroup.get('items') as FormArray;
  }

  addNewDepartment(){
    this.newDepartmentFormModalActive = true;
  }

  onNewDepartmentFormCancel(){
    this.newDepartmentFormModalActive = false;
  }

}

  

