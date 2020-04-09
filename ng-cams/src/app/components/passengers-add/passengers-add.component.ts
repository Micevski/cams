import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Participant} from "../../interfaces/participant.interface";
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PassengerCreateDialog} from "../../dialogs/passenger-create-dialog/passenger-create-dialog";
import {Passenger} from "../../interfaces/passenger.interface";
import {AccidentService} from "../../service/accident.service";
import {Person} from "../../interfaces/person.interface";
import { Router } from '@angular/router';

@Component({
  selector: 'passengers-add',
  templateUrl: './passengers-add.component.html',
  styleUrls: ['./passengers-add.component.scss']
})
export class PassengersAddComponent implements OnInit {

  @Input() participants: Participant[];
  @Input() passengers: Passenger[];
  @Output() savePassengersEvent = new EventEmitter<Passenger[]>();

  selected = new FormControl(0);

  constructor(private _builder: FormBuilder,
              private _dialog: MatDialog,
              private _service: AccidentService,
              private _route: Router) {

  }

  ngOnInit() {
  }

  openPassengerDialog(passenger: Passenger) {
    if (!passenger) {
      passenger = {
        participant: this.participants[this.selected.value],
        person: {} as Person,
        injuredLevel: null
      };
      this.passengers.push(passenger);
    }

    let isOwnerAlreadyPassenger = this.passengersForSelectedParticipant().find(it => {
      it.person.id = this.participants[this.selected.value].owner.id;
    }) != null;
    const passengerDialogRef = this._dialog.open(PassengerCreateDialog, {
      data: {
        owner: this.participants[this.selected.value].owner,
        passenger: passenger,
        addOwner: isOwnerAlreadyPassenger
      }
    });
    passengerDialogRef.afterClosed().subscribe(passenger => {
      if (passenger)
        console.log('Passenger updated');
    });
  }

  changeTab($event: number) {
    this.selected.setValue($event);
  }

  savePassengers() {

    let request = this.passengers.map(it => ({
      participantId: it.participant.id,
      passenger: it.person,
      injuredLevel: it.injuredLevel
    }));
    this._service.savePassengers(request)
      .subscribe(response => {
          this.passengers = response;
          this.savePassengersEvent.emit(this.passengers);
        },
        () => console.log('Error occurred'));

  }

  prevStep() {
    //TODO not implemented
  }

  passengersForSelectedParticipant() {
    return this.passengers.filter(it => it.participant == this.participants[this.selected.value])
  }
}
