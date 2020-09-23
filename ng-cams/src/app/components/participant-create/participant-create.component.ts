import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ParticipantService} from "../../service/participant.service";

@Component({
  selector: 'participant-create',
  templateUrl: './participant-create.component.html',
  styleUrls: ['./participant-create.component.scss']
})
export class ParticipantCreateComponent implements OnInit {

  @Input() participantForm: FormGroup;
  @Input() label = 'Participant';
  @Output() registerPateChanged = new EventEmitter<string>();

  constructor(private _service: ParticipantService) {
  }

  ngOnInit(): void {
  }

  onRegisterPlateChange() {
    this.registerPateChanged.emit(this.participantForm.controls.registerPlate.value);
  }
}
