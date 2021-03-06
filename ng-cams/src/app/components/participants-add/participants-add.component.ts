import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Participant} from '../../interfaces/participant.interface';
import {AccidentService} from '../../service/accident.service';
import {ActivatedRoute} from '@angular/router';
import {AccidentParticipant} from "../../interfaces/accident-participant.interface";
import {ParticipantService} from "../../service/participant.service";

@Component({
  selector: 'participants-add',
  templateUrl: './participants-add.component.html',
  styleUrls: ['./participants-add.component.scss']
})
export class ParticipantsAddComponent implements OnInit {

  @Output() saveParticipantsEvent = new EventEmitter();
  participantForm: FormGroup;
  ownerForm: FormGroup;

  selected = new FormControl(0);

  constructor(private _builder: FormBuilder,
              private _service: AccidentService,
              private _participantService: ParticipantService,
              private _route: ActivatedRoute) {
  }

  private _accidentId: number;
  private _participants: AccidentParticipant[] = [];

  get participants() {
    return this._participants;
  }

  ngOnInit() {
    this.initForms();
    const accidentId = +this._route.snapshot.paramMap.get('id');
    if (accidentId) {
      this._service.findAllParticipantsForAccident(accidentId).subscribe(participants => {
        this._participants = participants;
        if (this._participants.length > 0) {
          this.patchFormsValues(this._participants[0]);
        } else {
          this._participants.push({});
        }
      });
      this._accidentId = accidentId;
    }
  }

  private initForms() {
    this.participantForm = this._builder.group({
      id: [],
      accidentParticipantId: [],
      type: [],
      model: [],
      make: [],
      productionYear: [],
      registerPlate: [],
      guilty: []
    });

    this.ownerForm = this._builder.group({
      id: [],
      firstName: [],
      lastName: [],
      dateOfBirth: [],
      genderId: [],
      uniquePersonIdentifier: [],
    });
  }

  addTab() {
    this._participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };

    this._participants.push({owner: {}});
    this.changeTab(this._participants.length - 1);

  }

  removeTab(index: number) {
    this.changeTab(index !== 0 ? index - 1 : index + 1);
    this._participants.splice(index, 1);
  }

  changeTab($event: number) {
    this._participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };
    this.selected.setValue($event);
    this.patchFormsValues(this._participants[$event]);
  }

  private patchFormsValues(participant: AccidentParticipant | Participant) {
    const owner = participant.owner;
    const accidentParticipantIdOptional = 'accidentParticipantId' in participant ? participant.accidentParticipantId : null;
    const guilty = 'guilty' in participant ? participant.guilty : null;
    this.participantForm.patchValue({
      id: participant.id,
      accidentParticipantId: accidentParticipantIdOptional,
      type: participant.type,
      model: participant.model,
      make: participant.make,
      productionYear: participant.productionYear,
      registerPlate: participant.registerPlate,
      guilty
    });

    this.ownerForm.patchValue({
      id: owner.id,
      firstName: owner.firstName,
      lastName: owner.lastName,
      dateOfBirth: owner.dateOfBirth,
      genderId: owner.genderId,
      uniquePersonIdentifier: owner.uniquePersonIdentifier
    });
  }

  saveParticipants() {
    this._participants[this.selected.value] = {
      ...this.participantForm.getRawValue(),
      owner: this.ownerForm.getRawValue()
    };
    this._service.saveParticipants(this._participants, this._accidentId)
      .subscribe(response => {
          this._participants = response;
          this.saveParticipantsEvent.emit();
        },
        () => console.log('Error occurred'));
  }

  prevStep() {
    // TODO Not implemented yet
  }

  onRegisterPlateChange() {
    const plate = this.participantForm.controls.registerPlate.value;
    this._participantService.findByRegisterPlate(plate).subscribe(
      it => this.patchFormsValues(it), err => console.log('Not found'));
  }
}
