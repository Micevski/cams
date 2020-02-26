import {Component, Input, OnInit} from '@angular/core';
import {Participant} from "../../../interfaces/participant.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PassengerCreateDialog} from "../../../dialogs/passenger-create-dialog/passenger-create-dialog";
import {Passenger} from "../../../interfaces/passenger.interface";

@Component({
  selector: 'passengers-add',
  templateUrl: './passengers-add.component.html',
  styleUrls: ['./passengers-add.component.scss']
})
export class PassengersAddComponent implements OnInit {

  @Input() participants: Participant[];
  passengers: Passenger[] = [];

  selected = new FormControl(0);

  constructor(private _builder: FormBuilder,
              private _dialog: MatDialog) {

  }

  ngOnInit() {
  }

  openPassengerDialog(){
    const passengerDialogRef = this._dialog.open(PassengerCreateDialog);
    passengerDialogRef.afterClosed().subscribe(passenger => {
      if(passenger)
        this.passengers.push({participant:this.participants[this.selected.value], passenger: passenger, injuredLevel: passenger.injuredLevel});
    });
  }

  changeTab($event: number) {
    this.selected.setValue($event);
  }

  savePassengers() {
    //TODO Save all passengers per participant
  }

  prevStep() {
    //TODO not implemented
  }

  passengersForSelectedParticipant() {
    return this.passengers.filter(it => it.participant == this.participants[this.selected.value])
      .map(it => it.passenger)
  }
}
