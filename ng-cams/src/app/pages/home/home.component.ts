import { Component, OnInit, ViewChild } from '@angular/core';
import { AccidentService } from '../../service/accident.service';
import { MatTableDataSource } from '@angular/material/table';
import { Accident } from '../../interfaces/accident.interface';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AccidentService,
              private _router: Router,
              private _datepipe: DatePipe) {
  }

  displayedColumns: string[] = ['id', 'date', 'reason', 'description', 'streetName', 'city', 'area'];
  page: number = 1;
  length: number;
  pageSize: number = 10;

  accidents: Accident[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this._service.findAllAccidents(this.page, this.pageSize)
      .subscribe(res => {
        this.accidents = res.content;
        this.length = res.totalElements;
        this.dataSource = new MatTableDataSource<any>(this.accidents);
      });
    this.dataSource.sort = this.sort;
  }

  pageChanged($event: PageEvent) {
    console.log($event);
    this.pageSize = $event.pageSize;
    this._service.findAllAccidents(this.page + $event.pageIndex, this.pageSize)
      .subscribe(res => {
        this.accidents = res.content;
        this.dataSource = new MatTableDataSource<any>(this.accidents);
      });
  }

  openAccidentDetails(row: any) {
    this._router.navigate([`/accident/${row.id}`]);
  }

  dateFormatted(dateAccident: string) {
    let date = new Date(dateAccident);
    return this._datepipe.transform(date, 'dd MMM yyyy HH:mm');
  }
}
