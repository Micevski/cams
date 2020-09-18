import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialog } from '../../dialogs/add-user-dialog/add-user-dialog';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _dialog: MatDialog,
              private _userService: UserService) { }

  ngOnInit() {}

  createUser() {
    const newUserDialogRef = this._dialog.open(AddUserDialog);
    newUserDialogRef.afterClosed().subscribe(response => {
      if (response) {
        this._userService.createUser(response.password, response.user)
          .subscribe(res => {
            window.location.reload();
          });
      }
    });

  }
}
