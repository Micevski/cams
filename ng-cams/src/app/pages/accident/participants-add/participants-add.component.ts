import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Participant} from "../../../interfaces/participant.interface";

@Component({
  selector: 'participants-add',
  templateUrl: './participants-add.component.html',
  styleUrls: ['./participants-add.component.scss']
})
export class ParticipantsAddComponent implements OnInit {

  @Input() participants: Participant[];
  @Output() saveParticipantsEvent = new EventEmitter<Participant[]>();
  participantForm: FormGroup;
  ownerForm: FormGroup;

  selected = new FormControl(0);

  constructor(private _builder: FormBuilder) {
  }

  ngOnInit() {
    this.initForms();
    if (this.participants.length === 0) {
      this.participants.push({})
    }
  }

  private initForms() {
    this.participantForm = this._builder.group({
      type: [],
      model: [],
      make: [],
      productionYear: [],
      registerPlate: []
    });

    this.ownerForm = this._builder.group({
      personId: [],
      firstName: [],
      lastName: [],
      dateOfBirth: [],
      genderId: [],
      placeOfBirth: [],
      placeOfLiving: []
    });
  }

  addTab() {
    this.participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };

    this.participants.push({owner:{}});
    this.changeTab(this.participants.length - 1);

  }

  removeTab(index: number) {
    this.changeTab(index!=0? index-1 : index+1);
    this.participants.splice(index, 1);
  }

  changeTab($event: number) {
    this.participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };
    this.selected.setValue($event);
    this.patchFormsValues(this.participants[$event]);
    console.log(this.participants)
  }

  private patchFormsValues(participant: any) {
    let owner = participant.owner;
    this.participantForm.patchValue({
      type: participant.type,
      model: participant.model,
      make: participant.make,
      productionYear: participant.productionYear,
      registerPlate: participant.registerPlate
    });

    this.ownerForm.patchValue({
      firstName: owner.firstName,
      lastName: owner.lastName,
      dateOfBirth: owner.dateOfBirth,
      genderId: owner.genderId,
      placeOfBirth: owner.placeOfBirth,
      placeOfLiving: owner.placeOfLiving,
    })
  }

  saveParticipants(){
    this.participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };
    this.saveParticipantsEvent.emit(this.participants);
  }

  prevStep() {

  }
}
