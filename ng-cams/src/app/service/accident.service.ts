import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../interfaces/participant.interface";
import {Option} from "../interfaces/option.interface";
import {Passenger} from "../interfaces/passenger.interface";
import {Accident} from "../interfaces/accident.interface";
import {Page} from "../interfaces/page.interface";

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private _http: HttpClient) {
  }

  findAllAccidents(page: number, pageSize: number): Observable<Page> {
    return this._http.get<Page>(`/api/accidents/filter?page=${page}&pageSize=${pageSize}`);
  }

  saveAccident(accidentRequest: any): Observable<any> {
    return this._http.post<any>('/api/accidents', accidentRequest);
  }

  saveParticipants(participants: Participant[], accidentId: number) {
    return this._http.post<Participant[]>(`/api/accident-participant/add/${accidentId}`, participants)
  }

  savePassengers(passengers: any): Observable<Passenger[]> {
    console.log('passengers request', passengers);
    return this._http.post<Passenger[]>('/api/passengers/add', passengers);
  }

  findAllInjuredLevels(): Observable<Option[]> {
    return this._http.get<Option[]>('/api/passengers/injured-levels');
  }

  findAllGenders(): Observable<Option[]> {
    return this._http.get<Option[]>('/api/passengers/genders')
  }
}
