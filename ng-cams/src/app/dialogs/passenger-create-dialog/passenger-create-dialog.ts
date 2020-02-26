import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccidentService} from "../../service/accident.service";
import {Observable} from "rxjs";
import {Option} from "../../interfaces/option.interface";

@Component({
  templateUrl: './passenger-create-dialog.html',
  styleUrls: ['./passenger-create-dialog.scss']
})
export class PassengerCreateDialog implements OnInit {

  constructor(private _dialogRef: MatDialogRef<PassengerCreateDialog>,
              private _builder: FormBuilder,
              private _service: AccidentService) {}

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
  }

  onSave() {
    this._dialogRef.close(this.passenger.getRawValue());
  }

  onCancel() {
    this._dialogRef.close();
  }
}
