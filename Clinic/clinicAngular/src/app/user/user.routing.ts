import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component'
import { DoctorComponent } from './doctor/doctor.component';
import { NurseComponent } from './nurse/nurse.component';
import { DepartmentComponent } from './department/department.component';
import { DoctordepartmentComponent } from './doctordepartment/doctordepartment.component';
import { AdmitComponent } from './admit/admit.component';
import { DetailsComponent } from './admit/details/details.component';

const userRoutes: Routes = [
    {path: 'patient', component: PatientComponent},
    {path: 'nurse', component: NurseComponent},
    {path: 'doctor', component: DoctorComponent},
    {path: 'department', component: DepartmentComponent},
    {path: 'doctordepartment', component: DoctordepartmentComponent},
    {path: 'admit', component: AdmitComponent},
    {path: 'details/:patientId', component: DetailsComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
  })
export class UserRoutingModule {}