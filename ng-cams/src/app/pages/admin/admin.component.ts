import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  personForm: FormGroup;
  passwordForm: FormGroup;
  constructor(private _builder: FormBuilder,
              private _userService: UserService) { }

  ngOnInit() {

    this.personForm = this._builder.group({
      personId: [],
      firstName: [],
      lastName: [],
      dateOfBirth: [],
      genderId: [],
      placeOfBirth: [],
      placeOfLiving: []
    });

    this.passwordForm = this._builder.group({
      password: ['',Validators.minLength(6)],
    })
  }

  createUser($event: any) {
    console.log(this.passwordForm.getRawValue());
    this._userService.createUser(this.passwordForm.controls.password.value  , this.personForm.getRawValue())
      .subscribe(res => {
        console.log(res);
      });
  }
}
