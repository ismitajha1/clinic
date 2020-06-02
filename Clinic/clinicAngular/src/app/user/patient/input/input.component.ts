import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filteredPatient } from '../store/patient.action';
import { AppState } from '../../user.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onInput($event: InputEvent): void {
    this.store.dispatch((filteredPatient({text: $event.target['value']})));
  }
}
