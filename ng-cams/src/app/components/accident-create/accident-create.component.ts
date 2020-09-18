import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeocoderAddressComponent, MapsAPILoader, MouseEvent } from '@agm/core';
import { Accident } from '../../interfaces/accident.interface';
import { AccidentService } from '../../service/accident.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'accident-create',
  templateUrl: './accident-create.component.html',
  styleUrls: ['./accident-create.component.scss']
})
export class AccidentCreateComponent implements OnInit, AfterViewInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  @Output() saveAccidentEvent = new EventEmitter<number>();

  accidentForm: FormGroup;
  accident: Accident;
  fullLocation: GeocoderAddressComponent[];

  accidentId: number;

  get latitude(): number {
    return this.accidentForm.controls.lat.value;
  }

  get longitude(): number {
    return this.accidentForm.controls.lng.value;
  }

  get fullLocationInfo(): string {
    const location = this.accident.location;
    const streetName = location?.streetName || this._getPropertyFromFullLocation('route') || '';
    const streetNumber = location?.streetNumber || this._getPropertyFromFullLocation('street_number') || '';
    const city = location?.city || this._getPropertyFromFullLocation('locality') || '';
    const country = location?.country || this._getPropertyFromFullLocation('country') || '';
    const postcode = location?.postcode || this._getPropertyFromFullLocation('postal_code') || '';
    return `${streetName} ${streetNumber}, ${city}, ${country}, ${postcode}`;
  }

  address: string;
  zoom = 12;

  constructor(private _builder: FormBuilder,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private _route: ActivatedRoute,
              private _service: AccidentService) {
  }

  ngOnInit() {
    this.initForm();
    this.accidentId = +this._route.snapshot.paramMap.get('id');
  }

  private initForm() {
    this.accidentForm = this._builder.group({
      lat: [],
      lng: [],
      dateAccident: [this.dateNow],
      reason: [],
      description: [],
      fullLocationInfo: [],
      area: []
    });
  }

  ngAfterViewInit() {
    if (this.accidentId) {
      this._service.findAccidentById(this.accidentId)
        .subscribe(accident => {
          this.accident = accident;
          this.populateForm(this.accident);
        });
    } else {
      this.setCurrentLocation();
    }
    this.accident = {} as Accident;
    this.loadPlacesAutocomplete();
  }

  populateForm(accident: Accident) {
    this.patchValues(this.accidentForm, accident);
    this.getAddress(accident.location.lat, accident.location.lng);
    this.accidentForm.patchValue({
      lat: accident.location.lat,
      lng: accident.location.lng,
      fullLocation: this.fullLocationInfo,
      area: accident.location.area
    });
  }

  get dateNow() {
    return new Date();
  }

  private loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder;
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.setComponentRestrictions({
        country: ['mk']
      });
      autocomplete.addListener('place_changed', ($event) => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.fullLocation = place.address_components;
          this.accidentForm.patchValue({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            zoom: 15
          });
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
          this.accidentForm.patchValue({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          this.getAddress(this.latitude, this.longitude);
        },
        error => {
          console.log('Error Occured while locating you');
        }, { enableHighAccuracy: true }
      );
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.accidentForm.patchValue({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      zoom: 15
    });
    this.getAddress(this.latitude, this.longitude);

  }

  getAddress(latitude, longitude) {
    this.mapsAPILoader.load().then(() => {
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            this.fullLocation = results[0].address_components;
            this.accidentForm.patchValue({ fullLocationInfo: this.fullLocationInfo });
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  saveAccident() {
    if (this.accidentForm.invalid) {
      return;
    }
    const formValues = this.accidentForm.getRawValue();
    const location = {
      id: this.accident?.location?.id,
      lat: formValues.lat,
      lng: formValues.lng,
      streetName: this._getPropertyFromFullLocation('route'),
      streetNumber: this._getPropertyFromFullLocation('street_number'),
      city: this._getPropertyFromFullLocation('locality'),
      country: this._getPropertyFromFullLocation('country'),
      postcode: this._getPropertyFromFullLocation('postal_code'),
      area: formValues.area
    };
    console.log(location);
    const accidentRequest = {
      id: this.accident?.id,
      location,
      dateAccident: formValues.dateAccident,
      reason: formValues.reason,
      description: formValues.description
    };
    this._service.saveAccident(accidentRequest)
      .subscribe(res => {
          this.saveAccidentEvent.emit(res.id);
        },
        () => console.log('Error occurred'));
  }

  patchValues(formGroup: FormGroup, values: any) {
    if (!formGroup || !values) {
      return;
    }
    const keys = Object.keys(values);
    keys.forEach(key => formGroup.contains(key) && formGroup.patchValue({ [key]: values[key] }));
  }

  private _getPropertyFromFullLocation(property: string): string {
    if (this.fullLocation) {
      return this.fullLocation.filter(it => it.types.includes(property))[0]?.long_name;
    }
  }
}
