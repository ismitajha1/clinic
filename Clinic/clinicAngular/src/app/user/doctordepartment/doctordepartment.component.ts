import { Component, OnInit } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { fetchDepartments } from '../department/store/department.action';
import { selectDepartments } from '../department/store/department.selector';
import { Department } from '../department/department.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../user.model';

@Component({
  selector: 'app-doctordepartment',
  templateUrl: './doctordepartment.component.html',
  styleUrls: ['./doctordepartment.component.scss']
})
export class DoctordepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  departmentlist: Department[];
  doctorid: string;

  private readonly unsubscribe = new Subject<void>();
  constructor(private formbuilder: FormBuilder, private readonly store: Store<AppState>,
    private readonly acroute: ActivatedRoute, private readonly httpClient: HttpClient,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(fetchDepartments());
    this.store.pipe(select(selectDepartments), takeUntil(this.unsubscribe)).subscribe(val => this.departmentlist = val);
    this.departmentForm = this.formbuilder.group({
      items: this.formbuilder.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.formbuilder.group({
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
    return this.departmentForm.get('items') as FormArray
  }

  onFormSubmitBtnClick(departments) {
    console.log(departments);
    const bparams = new HttpParams()
      .set('departments', departments);

      this.acroute.queryParams.subscribe(params => {
          const url = 'http://localhost:8080/doctordepartment/?id='+params.id;
          this.httpClient.post<any>(url,{bparams})
            .subscribe(result => this.router.navigate(['/doctor']));
  });
}
}