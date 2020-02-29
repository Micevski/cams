import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccidentService} from "../../service/accident.service";
import {Participant} from "../../interfaces/participant.interface";
import {Accident} from "../../interfaces/accident.interface";
import {Passenger} from "../../interfaces/passenger.interface";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

  step = 0;
  participants: Participant[] = [];
  passengers: Passenger[] = [];
  accident: Accident;
  createAccidentsForm: FormGroup;


  constructor(private _service: AccidentService,
              private _builder: FormBuilder,
              private  _route: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.createAccidentsForm = this._builder.group({
      lat: [],
      lng: [],
      dateAccident: [],
      reason: [],
      description: [],
      street: [],
      area: [],
    })
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

  saveAccident() {
    if (this.createAccidentsForm.invalid) return;

    let formValues = this.createAccidentsForm.getRawValue();
    let location = {
      lat: formValues.lat,
      lng: formValues.lng,
      streetName: formValues.street,
      area: formValues.area,
    };
    let accidentRequest = {
      location: location,
      dateAccident: formValues.dateAccident,
      reason: formValues.reason,
      description: formValues.description
    };
    this.step = 1;

    this._service.saveAccident(accidentRequest)
      .subscribe(res => {
          this.accident = res;
          this.step = 1;
        },
        () => console.log("Error occurred"));
  }

  saveParticipants() {
    this._service.saveParticipants(this.participants, this.accident.id)
      .subscribe(response => {
          this.participants = response;
          this.step = 2;
          console.log("Participants saved", this.participants);
        },
        () => console.log("Error occurred"));
  }

  savePassengers() {
    let request = this.passengers.map(it => ({
      participantId: it.participant.id,
      passenger: it.passenger,
      injuredLevel: it.injuredLevel
    }));
    this._service.savePassengers(request)
      .subscribe(response => {
          this.passengers = response;
          console.log("Passengers saved", this.passengers);
          this._route.navigateByUrl('/home');
        },
        () => console.log("Error occurred"));
  }
}
