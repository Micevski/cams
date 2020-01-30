import { Component, OnInit } from '@angular/core';
import {AccidentService} from "../../service/accident.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  accidents$: Observable<any[]>;

  constructor(private service: AccidentService) { }

  ngOnInit() {
    this.accidents$ = this.service.findAllAccidents();
  }



}
