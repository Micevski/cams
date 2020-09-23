import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-user-dialog.html',
  styleUrls: ['./add-user-dialog.scss']
})
export class AddUserDialog implements OnInit {

  constructor(private _dialogRef: MatDialogRef<AddUserDialog>,
              private _builder: FormBuilder) { }

  personForm: FormGroup;
  passwordForm: FormGroup;

  ngOnInit() {

    this.personForm = this._builder.group({
      id: [],
      firstName: [],
      lastName: [],
      dateOfBirth: [],
      uniquePersonIdentifier: [],
      genderId: [],
    });

    this.passwordForm = this._builder.group({
      password: ['', Validators.minLength(6)]
    });
  }

  createUser() {
    this._dialogRef.close({
      user: this.personForm.getRawValue(),
      password: this.passwordForm.controls.password.value
    });
  }

  onCancel() {
    this._dialogRef.close();
  }
}
