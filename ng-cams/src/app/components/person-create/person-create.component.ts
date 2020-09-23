import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Option} from '../../interfaces/option.interface';
import {AccidentService} from '../../service/accident.service';
import {PersonService} from "../../service/person.service";
import {Person} from "../../interfaces/person.interface";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.scss']
})
export class PersonCreateComponent implements OnInit {

  constructor(private _service: AccidentService,
              private _personService: PersonService,
              private _builder: FormBuilder) {
  }

  @Input() person: FormGroup;
  @Input() label = 'Person';
  genders$: Observable<Option[]>;

  ngOnInit(): void {
    this.genders$ = this._service.findAllGenders();
    this.person.controls.uniquePersonIdentifier
      .setValidators([Validators.required,
        Validators.minLength(13),
        Validators.pattern('^[0-9]*$')]);
  }

  findPersonByUniqueIdentifier() {
    const uniqueIdentifier = this.person.controls.uniquePersonIdentifier.value;
    this._personService.findPersonByUniqueIdentifier(uniqueIdentifier).subscribe(
      it => this.patchValues(it), err => console.log('Not found'));
  }

  patchValues(person: Person) {
    this.person.patchValue({
      id: person.id,
      firstName: person.firstName,
      lastName: person.lastName,
      dateOfBirth: person.dateOfBirth,
      genderId: person.genderId,
      uniquePersonIdentifier: person.uniquePersonIdentifier,
    });
  }
}
