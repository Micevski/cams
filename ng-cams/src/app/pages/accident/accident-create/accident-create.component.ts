import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MapsAPILoader, MouseEvent} from "@agm/core";

@Component({
  selector: 'accident-create',
  templateUrl: './accident-create.component.html',
  styleUrls: ['./accident-create.component.scss']
})
export class AccidentCreateComponent implements OnInit {

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  @Input() createAccidentForm: FormGroup;
  @Output() saveAccidentEvent = new EventEmitter<any>();

  //TODO make this getters from FormGroup
  latitude: number;
  longitude: number;

  address: string;
  zoom: number = 12;
  private geoCoder;


  constructor(private _builder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }


  ngOnInit() {
    this.createAccidentForm.patchValue({dateAccident: this.dateNow});
    this.loadPlacesAutocomplete()
    this.setCurrentLocation();

  }

  get dateNow() {
    return new Date();
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


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.createAccidentForm.patchValue({
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
    this.createAccidentForm.patchValue({
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
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
          this.createAccidentForm.patchValue({street: this.address})
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  saveAccident() {
    this.saveAccidentEvent.emit(this.createAccidentForm);
  }
}
