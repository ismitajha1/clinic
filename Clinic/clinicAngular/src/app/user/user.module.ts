import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MessageService } from '../shared/message.service';
import { UserService } from './user.service';
import { PatientComponent } from './patient/patient.component';
import { NurseComponent } from './nurse/nurse.component';
import { AdmitComponent } from './admit/admit.component';
import { DetailsComponent } from './admit/details/details.component';
import { DepartmentComponent } from './department/department.component';
import { DoctordepartmentComponent } from './doctordepartment/doctordepartment.component';
import { DoctorComponent } from './doctor/doctor.component';
import { InputComponent } from './patient/input/input.component';
import { TableComponent } from './common/table/table.component';


@NgModule({
  declarations: [
    TableComponent,
    PatientComponent,
    NurseComponent,
    AdmitComponent,
    DetailsComponent,
    DepartmentComponent,
    DoctordepartmentComponent,
    DoctorComponent,
    InputComponent
  ],
				
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService]
})

export class UserModule {
  
  constructor(private readonly router: Router,
    private readonly msg:MessageService){
    if(!localStorage.getItem('loggedUser')){
      this.msg.info("Login to proceed");
      this.router.navigate(['/auth/login/']);
    }
  }
 }