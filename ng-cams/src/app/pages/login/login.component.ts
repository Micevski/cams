import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _builder: FormBuilder, private _userService: UserService, private _router: Router,
              private _route: ActivatedRoute,
              private _toast: ToastrService) {
  }

  form: FormGroup;

  ngOnInit() {
    this.form = this._builder.group({
      username: [],
      password: []
    });
  }

  submit() {
    this._userService.logIn(this.form.controls.username.value, this.form.controls.password.value)
      .subscribe(res => {
        if (res) {
          let url = this.getRedirectUrl();
          this._router.navigate([url]);
        } else {
          this._toast.error('Username or password is incorrect', 'Rejected');

        }
      });
  }

  getRedirectUrl() {
    let url;
    this._route.queryParamMap.subscribe(params => url = params.get('returnUrl'));
    if(url) {
      return url;
    }else {
      return '/';
    }
  }
}
