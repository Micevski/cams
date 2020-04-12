import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PassengerCreateDialog} from "../../dialogs/passenger-create-dialog/passenger-create-dialog";
import {Passenger} from "../../interfaces/passenger.interface";
import {AccidentService} from "../../service/accident.service";
import {Person} from "../../interfaces/person.interface";
import {ActivatedRoute, Router} from '@angular/router';
import {Participant} from "../../interfaces/participant.interface";

@Component({
  selector: 'passengers-add',
  templateUrl: './passengers-add.component.html',
  styleUrls: ['./passengers-add.component.scss']
})
export class PassengersAddComponent implements OnInit {


  @Output() savePassengersEvent = new EventEmitter();

  passengers: Passenger[];
  participants: Participant[];
  private accidentId: number;
  selected = new FormControl(0);

  constructor(private _builder: FormBuilder,
              private _dialog: MatDialog,
              private _service: AccidentService,
              private _router: Router,
              private _route: ActivatedRoute) {

  }

  ngOnInit() {
    const accidentId = +this._route.snapshot.paramMap.get('id');
    if (accidentId) {
      this._service.findAllPassengersForAccident(accidentId).subscribe(passengers => {
        this.passengers = passengers;
        this._service.findAllParticipantsForAccident(accidentId).subscribe(participants => {
          this.participants = participants;
        });
      });
      this.accidentId = accidentId;
    }
  }

  openPassengerDialog(passenger: Passenger) {
    if (!passenger) {
      passenger = {
        participant: this.participants[this.selected.value],
        passenger: {} as Person,
        injuredLevel: null
      };
      this.passengers.push(passenger);
    }

    const isOwnerAlreadyPassenger = this.passengersForSelectedParticipant().find(it => {
      it.passenger.id = this.participants[this.selected.value].owner.id;
    }) != null;
    const passengerDialogRef = this._dialog.open(PassengerCreateDialog, {
      data: {
        owner: this.participants[this.selected.value].owner,
        passenger: passenger,
        addOwner: isOwnerAlreadyPassenger
      }
    });
    passengerDialogRef.afterClosed().subscribe(passenger => {
      if (passenger) {
        console.log('Passenger updated');
      }
    });
  }

  changeTab($event: number) {
    this.selected.setValue($event);
  }

  savePassengers() {

    const request = this.passengers.map(it => ({
      participantId: it.participant.id,
      passenger: it.passenger,
      injuredLevel: it.injuredLevel
    }));
    this._service.savePassengers(request)
      .subscribe(response => {
          this.passengers = response;
          this.savePassengersEvent.emit();
        },
        () => console.log('Error occurred'));

  }

  prevStep() {
    // TODO not implemented
  }

  passengersForSelectedParticipant() {
    return this.passengers.filter(it => it.participant.id == this.participants[this.selected.value].id);
  }
}
