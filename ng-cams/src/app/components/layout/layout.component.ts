import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
  }


  logout() {
    this._userService.logout().subscribe(() =>{
      window.location.reload();
    });
  }

}
