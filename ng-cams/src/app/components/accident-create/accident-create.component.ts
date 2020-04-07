import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MapsAPILoader, MouseEvent} from "@agm/core";
import { Accident } from '../../interfaces/accident.interface';
import { AccidentService } from '../../service/accident.service';

@Component({
  selector: 'accident-create',
  templateUrl: './accident-create.component.html',
  styleUrls: ['./accident-create.component.scss']
})
export class AccidentCreateComponent implements OnInit {

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  @Input() set accident(accident: Accident) {
    if (accident && accident.id) {
      this._accident = accident;
      this.populateForm(accident);
    } else {
      this._accident = accident;
      this.setCurrentLocation();
    }
  }

  @Output() saveAccidentEvent = new EventEmitter<any>();

  accidentForm: FormGroup;
  private _accident: Accident
  get latitude(): number {
    return this.accidentForm.controls.lat.value;
  }

  get longitude(): number {
    return this.accidentForm.controls.lng.value;
  }

  address: string;
  zoom: number = 12;
  private geoCoder;


  constructor(private _builder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private _service: AccidentService) {
  }


  ngOnInit() {
    this.initForm();
    this.loadPlacesAutocomplete();

  }

  private initForm() {
    this.accidentForm = this._builder.group({
      lat: [],
      lng: [],
      dateAccident: [this.dateNow],
      reason: [],
      description: [],
      street: [],
      area: [],
    })
  }

  populateForm(accident: Accident) {
    console.log('Populate data',accident);
    this.patchValues(this.accidentForm, accident);
    this.accidentForm.patchValue({
      lat: accident.location.lat,
      lng: accident.location.lng,
      street: accident.location.streetName,
      area: accident.location.area
    });
  }

  get dateNow() {
    return new Date();
  }

  private loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.zoom = 12;
        });
      });
    });
  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.accidentForm.patchValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        this.getAddress(this.latitude, this.longitude)
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.accidentForm.patchValue({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      zoom: 15,
    });
    this.getAddress(this.latitude, this.longitude);

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.accidentForm.patchValue({street: this.address})
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  saveAccident() {
    if (this.accidentForm.invalid) {
      return;
    }
    let formValues = this.accidentForm.getRawValue();
    let location = {
      lat: formValues.lat,
      lng: formValues.lng,
      streetName: formValues.street,
      area: formValues.area
    };
    let accidentRequest = {
      location: location,
      dateAccident: formValues.dateAccident,
      reason: formValues.reason,
      description: formValues.description
    };
    this._service.saveAccident(accidentRequest)
      .subscribe(res => {
          this.saveAccidentEvent.emit(res);
        },
        () => console.log('Error occurred'));
  }

  patchValues(formGroup: FormGroup, values: any) {
    if (!formGroup || !values) {
      return;
    }
    const keys = Object.keys(values);
    keys.forEach(key => formGroup.contains(key) && formGroup.patchValue({[key]: values[key]}));
  }
}
