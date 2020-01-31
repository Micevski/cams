import {Component, OnInit} from '@angular/core';
import {AccidentService} from "../../service/accident.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accidents: any[];

  displayedColumns: string[] = ['Date', 'City', 'Area'];
  dataSource = new MatTableDataSource<any>(this.accidents);

  constructor(private service: AccidentService) {
  }

  ngOnInit() {
    this.service.findAllAccidents().subscribe(data => {
      this.accidents = data;
    });
  }


}
