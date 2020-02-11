import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersAddComponent } from './passengers-add.component';

describe('PassengersAddComponent', () => {
  let component: PassengersAddComponent;
  let fixture: ComponentFixture<PassengersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
