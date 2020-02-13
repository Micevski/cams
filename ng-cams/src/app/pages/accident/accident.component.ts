import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccidentService} from "../../service/accident.service";
import {Participant} from "../../interfaces/participant.interface";
import {Accident} from "../../interfaces/accident.interface";

@Component({
    selector: 'accident',
    templateUrl: './accident.component.html',
    styleUrls: ['./accident.component.scss']
})
export class AccidentComponent implements OnInit {

    step = 0;
    participants: Participant[] = [];
    accident: Accident;
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
                    console.log("Accident saved");
                    this.accident = res;
                    this.step = 1;
                    console.log(res);
                },
                () => console.log("Error occurred"));
        console.log(this.accident);
    }

    saveParticipants(participants: Participant[]) {
        this._service.saveParticipants(participants, this.accident.id)
            .subscribe(() => {
                console.log("Participants saved");
                this.step = 2;
            });
    }
}
