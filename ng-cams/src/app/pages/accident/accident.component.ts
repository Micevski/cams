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
  participants: Participant[] = [];
  passengers: Passenger[] = [];
  accident: Accident = {};

  constructor(private _service: AccidentService,
              private _builder: FormBuilder,
              private  _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this._route.snapshot.queryParamMap.has('step')) {
      this.step = +this._route.snapshot.queryParamMap.get('step');
    }
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

  saveAccident($event: Accident) {
    console.log(this.step, $event);
    this.accident = $event;
    this._router.navigateByUrl(`accident/${this.accident.id}?step=1`);
    this.step = 1;
  }

  saveParticipants($event: Participant[]) {
    this.participants = $event;
    this.step = 2;
  }

  savePassengers($event: Passenger[]) {
    this.passengers = $event;
    this._router.navigateByUrl('/home');
  }
}
