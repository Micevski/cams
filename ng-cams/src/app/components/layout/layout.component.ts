import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isAdminLogged: boolean = false;
  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.isAdminLoggedIn();
  }

  logout() {
    this._userService.logout().subscribe(() => {
      window.location.reload();
    });
  }

  isAdminLoggedIn() {
    this._userService.getAuthentication()
      .subscribe(res => {
       this.isAdminLogged = res.authorities[0].authority === 'ADMIN';
      });
  }

}
