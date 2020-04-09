import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from '../../service/user.service';
import { User } from '../../interfaces/user-interface';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private _service: UserService) { }

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'role'];
  page: number = 1;
  length: number;
  pageSize: number = 10;

  users: User[];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this._service.findAllUsers(this.page, this.pageSize)
      .subscribe(res => {
        this.users = res.content;
        this.length = res.totalElements;
        this.dataSource = new MatTableDataSource<any>(this.users);
      });
    this.dataSource.sort = this.sort;
  }

  pageChanged($event: PageEvent) {
    console.log($event);
    this.pageSize = $event.pageSize;
    this._service.findAllUsers(this.page + $event.pageIndex, this.pageSize)
      .subscribe(res => {
        this.users = res.content;
        this.dataSource = new MatTableDataSource<any>(this.users);

      })
  }


}