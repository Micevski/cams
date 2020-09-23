import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Option} from '../../interfaces/option.interface';
import {AccidentService} from '../../service/accident.service';

@Component({
  selector: 'person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  constructor(private _service: AccidentService,
              private _builder: FormBuilder) {
  }

  @Input() person: FormGroup;

  @Input() label = 'Person';
  genders$: Observable<Option[]>;

  ngOnInit(): void {
    this.genders$ = this._service.findAllGenders();

  }

}
