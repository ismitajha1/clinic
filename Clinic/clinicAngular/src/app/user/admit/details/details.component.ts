import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../patient/patient.model';
import { Admit, AppState } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  patient: Patient[];
  	admits: Admit;
	  patientId: number;

 
  	constructor(public store: Store<AppState>,
  		public http: HttpClient,private route: ActivatedRoute,
  		public readonly router: Router,
  		public appService: UserService) {

		  this.patientId = this.route.snapshot.params['patientId'];
		  
  		  this.appService.getDetails(this.patientId)
  			.subscribe(data => {
  			  console.log(data)
  			  this.admits = data;
  			}, error => console.log(error));
  		}
	  
  	  ngOnInit(): void {
  	  }

}