import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'clinic-front';
  hideLogin: boolean = true;
  hideLogout: boolean = true;
  
  constructor(private readonly router: Router){
    if(localStorage.getItem('loggedUser')){
      this.hideLogin = true;
      this.hideLogout = false;
    }else{
      this.hideLogin = false;
      this.hideLogout = true;
    }
  }

  logout(){
    if (!window.confirm('Are you sure?')){
      console.log("hello");
    }else{
    localStorage.clear();
    this.hideLogin = false;
    this.hideLogout = true;
    this.router.navigate(['/dashboard/']);
   } 
  }

  logger(){
    if(localStorage.getItem('loggedUser')){
      return true;
    }else{
      return false;
    }
  }

  ngOnInit(): void{

  }
}
