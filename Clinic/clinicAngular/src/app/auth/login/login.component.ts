import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Admin } from '../auth.model';
import { AuthService } from '../auth.service';
import { MessageService } from 'src/app/shared/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup: FormGroup;
  admin: Admin;
  user: Admin;

  constructor(
    private readonly authService: AuthService,
    private readonly msgservice: MessageService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      username: new FormControl('',  [Validators.pattern(/^[a-zA-Z0-9]*$/), Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.userFormGroup.get('username').valueChanges
      .subscribe(val => console.log(val));
    
      this.userFormGroup.get('password').valueChanges
        .subscribe(val => console.log(val));
  }

  login(){
    this.admin = this.userFormGroup.value;
    console.log(this.admin);
    this.authService.login(this.admin)
      .subscribe(
        data => {
          if(data){
            console.log(data);
            localStorage.setItem('loggedUser', data.username)
            this.msgservice.success("Welcome " + data.name);
            this.router.navigate(['/user/patient/']);
          }else{
            console.log("invalid user");
            this.msgservice.error("Invalid login credentials")
          }
        },
        error => {
          this.msgservice.error("Server not responding");
        });
  }
}
