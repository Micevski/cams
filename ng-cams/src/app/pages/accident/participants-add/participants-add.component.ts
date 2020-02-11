import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-participants-add',
  templateUrl: './participants-add.component.html',
  styleUrls: ['./participants-add.component.scss']
})
export class ParticipantsAddComponent implements OnInit {

  @Input() participants: any[];

  constructor() { }

  ngOnInit() {
  }

}
