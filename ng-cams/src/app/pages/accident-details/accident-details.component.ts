import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccidentService} from "../../service/accident.service";
import {Accident} from "../../interfaces/accident.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetails implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _accidentService: AccidentService,
              private _builder: FormBuilder) {
  }

  accident: Observable<Accident>;

  ngOnInit() {

    this.accident = this._route.paramMap.pipe(
      switchMap(paramMap => paramMap.has('id')
        ? this._accidentService.findAccidentById(+paramMap.get('id'))
        : of(<Accident>{})));
  }

  editLocation() {
    console.log("Fuck you")
  }

}
