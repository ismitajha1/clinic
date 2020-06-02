import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Column} from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() columns: Column[] = [];
  @Input() data: {}[] = [];

  @Output() editBtnClick = new EventEmitter<{}>();
  @Output() deleteBtnClick = new EventEmitter<{}>();
}
