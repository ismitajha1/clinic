import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctordepartmentComponent } from './doctordepartment.component';

describe('DoctordepartmentComponent', () => {
  let component: DoctordepartmentComponent;
  let fixture: ComponentFixture<DoctordepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctordepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctordepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
