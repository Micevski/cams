import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MapsAPILoader, MouseEvent} from "@agm/core";
import {AccidentService} from "../../service/accident.service";

@Component({
  selector: 'accident-create',
  templateUrl: './accident-create.component.html',
  styleUrls: ['./accident-create.component.scss']
})
export class AccidentCreateComponent implements OnInit {

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  step = 0;
  latitude: number;
  longitude: number;
  address: string;
  createAccidents: FormGroup;
  zoom: number = 12;
  private geoCoder;


  constructor(private _service: AccidentService,
              private _builder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }


  ngOnInit() {
    this.loadPlacesAutocomplete()
    this.setCurrentLocation();
    this.initForm();

  }

  get dateNow() {
    return new Date();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    //TODO refactor this logic to be based on if it is created or not?
    if (this.step === 0) {
      this.saveAccident();
    }
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  private loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private initForm() {
    this.createAccidents = this._builder.group({
      lat: [this.latitude],
      lng: [this.longitude],
      dateAccident: [this.dateNow],
      reason: [],
      description: [],
      street: [],
      area: [],

    })
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.createAccidents.patchValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude)
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.createAccidents.patchValue({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      zoom: 15,
    });
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);

  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({'location': {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.createAccidents.patchValue({street: this.address})
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  saveAccident() {
    if (this.createAccidents.invalid) return;

    let formValues = this.createAccidents.getRawValue();
    let location = {
      lat: formValues.latitude,
      lng: formValues.longitude,
      streetName: formValues.streetName,
      area: formValues.area,
    };
    let accidentRequest = {
      location: location,
      dateAccident: formValues.dateAccident,
      reason: formValues.reason,
      description: formValues.description
    };
    this._service.saveService(accidentRequest)
      .subscribe(() =>
          console.log("Accident saved"),
        () => console.log("Error occurred"));
  }
}
