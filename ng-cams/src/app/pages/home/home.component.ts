import {Component, OnInit, ViewChild} from '@angular/core';
import {AccidentService} from "../../service/accident.service";
import {MatTableDataSource} from "@angular/material/table";
import {Accident} from "../../interfaces/accident.interface";
import {MatSort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _service: AccidentService) {
  }

  displayedColumns: string[] = ['id', 'date', 'reason', 'description', 'location'];
  page: number = 1;
  length: number;
  pageSize: number = 10;

  accidents: Accident[];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

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

      })
  }
}
