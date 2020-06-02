import { Component, OnInit } from '@angular/core';
import { Column } from '../common/table/table.model';
import { Nurse } from './nurse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../user.model';
import { selectNurses } from './store/nurse.selector';
import { takeUntil } from 'rxjs/operators';
import { fetchNurses, saveNurse, updateNurse, deleteNurse } from './store/nurse.action';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.scss']
})
export class NurseComponent implements OnInit {

  readonly columns: Column[] = [
    {name: 'nName', label: 'Name'},
    {name: 'licenseNo', label: 'License Number'}
  ];
  readonly nurseFormControlKeys = {
    nName: 'nName',
    licenseNo: 'licenseNo'
  };

  nurses: Nurse[] = [];
  selectedNurse: Nurse;
  formModalActive = false;
  deleteModalActive = false;
  nurseFormGroup: FormGroup;

  private readonly unsubscribe = new Subject<void>();

  constructor(private readonly store: Store<AppState>, private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.prepareNurseFormGroup();
    this.store.pipe(select(selectNurses), takeUntil(this.unsubscribe)).subscribe(val => this.nurses = val);
    this.store.dispatch(fetchNurses());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onAddBtnClick(): void {
    this.selectedNurse = null;
    this.formModalActive = true;
    this.nurseFormGroup.patchValue({
      [this.nurseFormControlKeys.nName]: '',
      [this.nurseFormControlKeys.licenseNo]: ''
    });
  }

  onEditBtnClick(nurse: Nurse): void {
    this.selectedNurse = nurse;
    this.formModalActive = true;
    this.nurseFormGroup.patchValue({
      [this.nurseFormControlKeys.nName]: nurse.nName,
      [this.nurseFormControlKeys.licenseNo]: nurse.licenseNo
    });
  }

  onDeleteBtnClick(nurse: Nurse): void {
    this.selectedNurse = nurse;
    this.deleteModalActive = true;
  }

  onFormSubmitBtnClick(): void {
    if (this.selectedNurse == null) {
      this.store.dispatch(saveNurse({nurse: {...this.nurseFormGroup.value, id: null}}));
    } else {
      this.store.dispatch(updateNurse({nurse: {...this.nurseFormGroup.value, id: this.selectedNurse.id}}));
    }
    this.selectedNurse = null;
    this.formModalActive = false;
  }

  onFormCancelBtnClick(): void {
    this.selectedNurse = null;
    this.formModalActive = false;
  }

  onDeleteConfirm(): void {
    this.store.dispatch(deleteNurse({nurse: this.selectedNurse}));
    this.selectedNurse = null;
    this.deleteModalActive = false;
  }

  onDeleteReject(): void {
    this.selectedNurse = null;
    this.deleteModalActive = false;
  }

  private prepareNurseFormGroup(): void {
    this.nurseFormGroup = this.formBuilder.group({
      [this.nurseFormControlKeys.nName]: this.formBuilder.control('', [Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(50), Validators.required]),
      [this.nurseFormControlKeys.licenseNo]: this.formBuilder.control('', [Validators.pattern(/^[a-zA-Z0-9, -]*$/), Validators.maxLength(100), Validators.required])
    });
  }
}

