import { Component, OnInit } from '@angular/core';
import { Column } from '../common/table/table.model';
import { Department } from './department.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectDepartments } from './store/department.selector';
import { takeUntil } from 'rxjs/operators';
import { fetchDepartments, saveDepartment, updateDepartment } from './store/department.action';
import { AppState } from '../user.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  
  readonly columns: Column[] = [
    {name: 'depName', label: 'Name'}
  ];

  readonly departmentFormControlKeys = {
    depName: 'depName'
  };

  departments: Department[] = [];
  selectedDepartment: Department;
  formModalActive = false;
  deleteModalActive = false;
  departmentFormGroup: FormGroup;

  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.prepareDepartmentFormGroup();
    this.store.pipe(select(selectDepartments), takeUntil(this.unsubscribe)).subscribe(val => this.departments = val);
    this.store.dispatch(fetchDepartments());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddBtnClick(): void {
    this.selectedDepartment = null;
    this.formModalActive = true;
    this.departmentFormGroup.patchValue({
      [this.departmentFormControlKeys.depName]: ''
    });
  }

  onEditBtnClick(department: Department): void {
    this.selectedDepartment = department;
    this.formModalActive = true;
    this.departmentFormGroup.patchValue({
      [this.departmentFormControlKeys.depName]: department.depName
    });
  }


  onFormSubmitBtnClick(): void {
    if (this.selectedDepartment == null) {
      this.store.dispatch(saveDepartment({department: {...this.departmentFormGroup.value, id: null}}));
    } else {
      this.store.dispatch(updateDepartment({department: {...this.departmentFormGroup.value, id: this.selectedDepartment.id}}));
    }
    this.selectedDepartment = null;
    this.formModalActive = false;
  }

  onFormCancelBtnClick(): void {
    this.selectedDepartment = null;
    this.formModalActive = false;
  }

  private prepareDepartmentFormGroup(): void {
    this.departmentFormGroup = this.formBuilder.group({
      [this.departmentFormControlKeys.depName]: this.formBuilder.control('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50), Validators.required])
    });
  }
}
 
 
 