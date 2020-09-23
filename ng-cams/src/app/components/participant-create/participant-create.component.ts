import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'participant-create',
  templateUrl: './participant-create.component.html',
  styleUrls: ['./participant-create.component.scss']
})
export class ParticipantCreateComponent implements OnInit {

  @Input() participantForm: FormGroup;
  @Input() label = 'Participant';

  constructor() {
  }

  ngOnInit(): void {
  }

}
