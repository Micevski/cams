import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Participant } from '../../interfaces/participant.interface';
import { ParticipantService } from '../../service/participant.service';
import { Filter } from '../../interfaces/filter.interface';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.scss']
})
export class ParticipantsListComponent implements OnInit {

  constructor(private _service: ParticipantService) { }

  displayedColumns: string[] = ['id', 'model', 'make', 'registerPlate', 'ownerFirstName', 'ownerLastName', 'ownerUnique'];
  filteredColumns: Filter[] = [
    { name: 'model', placeholder: 'Model', type: 'STRING' },
    { name: 'make', placeholder: 'Make', type: 'STRING' },
    { name: 'registerPlate', placeholder: 'Register Plate', type: 'STRING' },
    { name: 'firstName', placeholder: 'First Name', type: 'STRING' },
    { name: 'lastName', placeholder: 'Last Name', type: 'STRING' },
    { name: 'uniqueIdentifier', placeholder: 'Unique Identifier', type: 'STRING' }];

  page = 1;
  length: number;
  pageSize = 10;

  participants: Participant[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this._service.findAllParticipants(this.page, this.pageSize)
      .subscribe(res => {
        this.participants = res.content;
        this.length = res.totalElements;
        this.dataSource = new MatTableDataSource<any>(this.participants);
      });
    this.dataSource.sort = this.sort;
  }

  pageChanged($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this._service.findAllParticipants(this.page + $event.pageIndex, this.pageSize)
      .subscribe(res => {
        this.participants = res.content;
        this.dataSource = new MatTableDataSource<any>(this.participants);
      });
  }

  filterChanged($event: string) {
    this._service.findAllParticipantsFiltered(this.page, this.pageSize, $event)
      .subscribe(res => {
        this.participants = res.content;
        this.dataSource = new MatTableDataSource<any>(this.participants);
      });
  }

}
