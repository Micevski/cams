import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isAdminLogged: boolean = false;
  loggedUser: any = null;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.getLoggedUser();
  }

  logout() {
    this._userService.logout().subscribe(() => {
      window.location.reload();
    });
  }

  getLoggedUser() {
    this._userService.getAuthentication()
      .subscribe(res => {
        this.loggedUser = res;
        this.isAdminLogged = res.authorities[0].authority === 'ADMIN';
      });
  }

}
