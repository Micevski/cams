import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccidentService } from '../../service/accident.service';
import { Participant } from '../../interfaces/participant.interface';
import { Accident } from '../../interfaces/accident.interface';
import { Passenger } from '../../interfaces/passenger.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

  step = 0;
  accidentId: number;
  constructor(private _service: AccidentService,
              private _builder: FormBuilder,
              private  _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this._route.snapshot.queryParamMap.has('step')) {
      this.step = +this._route.snapshot.queryParamMap.get('step');
    }
    this.accidentId = +this._route.snapshot.paramMap.get('id');
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  saveAccident(accidentId: number) {
    this.accidentId = accidentId;
    this._router.navigateByUrl(`accident/${this.accidentId}?step=1`);
    this.step = 1;
  }

  saveParticipants() {
    this._router.navigateByUrl(`accident/${this.accidentId}?step=2`);
    this.step = 2;
  }

  savePassengers() {
    this._router.navigateByUrl('/home');
  }
}
