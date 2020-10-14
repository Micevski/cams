import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '../../interfaces/filter.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  constructor(private _builder: FormBuilder) { }

  @Input() filters: Filter[];
  @Output() applyFilter = new EventEmitter<string>();
  filterFrom: FormGroup;

  ngOnInit(): void {
    this.filterFrom = this._builder.group({});
    this.filters.forEach(it =>
      this.filterFrom.addControl(it.name, new FormControl()));
    this.filterFrom.valueChanges.pipe(
      debounceTime(400),
      map(val => this.mapArrayToQueryParam(val as object))
    ).subscribe(query => this.applyFilter.emit(query));
  }

  mapArrayToQueryParam(obj: any) {
    Object.keys(obj).forEach(it => {
        if (obj[it] === null || obj[it] === undefined) {
          delete obj[it];
        }
      }
    );
    let query = '';
    Object.keys(obj).forEach((it, idx) => {
      if (idx === Object.keys(obj).length - 1) {
        query = query + `${it}=${obj[it]}`;
      } else {
        query = query + `${it}=${obj[it]}&`;

      }
    });
    return query;
  }

}
