import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Participant } from '../../interfaces/participant.interface';
import { ParticipantService } from '../../service/participant.service';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {

  constructor(private _service: ParticipantService) { }

  displayedColumns: string[] = ['id', 'model', 'make', 'registerPlate', 'ownerFirstName', 'ownerLastName', 'ownerUnique'];
  page = 1;
  length: number;
  pageSize = 10;

  users: Participant[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this._service.findAllParticipants(this.page, this.pageSize)
      .subscribe(res => {
        this.users = res.content;
        this.length = res.totalElements;
        this.dataSource = new MatTableDataSource<any>(this.users);
      });
    this.dataSource.sort = this.sort;
  }

  pageChanged($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this._service.findAllParticipants(this.page + $event.pageIndex, this.pageSize)
      .subscribe(res => {
        this.users = res.content;
        this.dataSource = new MatTableDataSource<any>(this.users);

      });
  }

}
