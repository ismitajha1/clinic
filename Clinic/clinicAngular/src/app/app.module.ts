import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { appReducer } from './user/store/app.reducer';
import { PatientComponentEffect } from './user/patient/store/patient.effect';
import { NurseComponentEffect } from './user/nurse/store/nurse.effect';
import { DoctorComponentEffect } from './user/doctor/store/doctor.effect';
import { DepartmentComponentEffect } from './user/department/store/department.effect';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessageService } from './shared/message.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    AppRoutingModule,
    UserModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PatientComponentEffect,NurseComponentEffect,DoctorComponentEffect,DepartmentComponentEffect])
  ],
  providers: [[MessageService],],
  bootstrap: [AppComponent]
})
export class AppModule {}
