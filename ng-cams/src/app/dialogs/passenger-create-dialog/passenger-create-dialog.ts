import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccidentService} from "../../service/accident.service";
import {Observable} from "rxjs";
import {Option} from "../../interfaces/option.interface";
import {Person} from "../../interfaces/person.interface";
import {Passenger} from "../../interfaces/passenger.interface";

@Component({
  templateUrl: './passenger-create-dialog.html',
  styleUrls: ['./passenger-create-dialog.scss']
})
export class PassengerCreateDialog implements OnInit {

  constructor(private _dialogRef: MatDialogRef<PassengerCreateDialog>,
              private _builder: FormBuilder,
              private _service: AccidentService,
              @Inject(MAT_DIALOG_DATA) public data: {owner: Person, passenger: Passenger, addOwner: boolean}) {
  }

  get ownerTooltip() {
    return `Add ${this.data.owner.firstName} ${this.data.owner.lastName} as passenger`
  }

  passenger: FormGroup;
  injuredLevels$: Observable<Option[]>;
  genders$: Observable<Option[]>;


  ngOnInit() {
    this.injuredLevels$ = this._service.findAllInjuredLevels();
    this.genders$ = this._service.findAllGenders();
    this.passenger = this._builder.group({
      personId: [],
      firstName: [],
      lastName: [],
      dateOfBirth: [],
      genderId: [],
      placeOfBirth: [],
      placeOfLiving: [],
      injuredLevel: [],
    });
    if (this.data.passenger.person) {
      this.patchValues(this.data.passenger.person);
    }
  }

  onSave() {
    let formValues = this.passenger.getRawValue();
    this.data.passenger.person.firstName = formValues.firstName;
    this.data.passenger.person.lastName = formValues.lastName;
    this.data.passenger.person.dateOfBirth = formValues.dateOfBirth;
    this.data.passenger.person.genderId = formValues.genderId;
    this.data.passenger.person.placeOfBirth = formValues.placeOfBirth;
    this.data.passenger.person.placeOfLiving = formValues.placeOfLiving;
    this.data.passenger.injuredLevel = formValues.injuredLevel;
    this._dialogRef.close(this.data.passenger);
  }

  onCancel() {
    this._dialogRef.close();
  }

  addOwnerAsPassenger() {
    let owner = this.data.owner;
    this.patchValues(owner);
  }

  patchValues(person: Person) {
    this.passenger.patchValue({
      personId: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      dateOfBirth: person.dateOfBirth,
      genderId: person.genderId,
      placeOfBirth: person.placeOfBirth,
      placeOfLiving: person.placeOfLiving
    })
  }
}
