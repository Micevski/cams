import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccidentService} from "../../service/accident.service";

@Component({
  selector: 'accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

  step = 0;
  createAccidentsForm: FormGroup;


  constructor(private _service: AccidentService,
              private _builder: FormBuilder) {
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

  //TODO refactor - do not pass formGroup, pass valid object.
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

    // this._service.saveService(accidentRequest)
    //   .subscribe(() => {
    //       console.log("Accident saved");
    //       this.step = 1;
    //     },
//        () => console.log("Error occurred"));
  }
}
