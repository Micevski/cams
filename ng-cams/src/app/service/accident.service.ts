import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Participant} from '../interfaces/participant.interface';
import {Option} from '../interfaces/option.interface';
import {Passenger} from '../interfaces/passenger.interface';
import {Page} from '../interfaces/page.interface';
import {Accident} from '../interfaces/accident.interface';
import {AccidentParticipant} from "../interfaces/accident-participant.interface";
import {Person} from "../interfaces/person.interface";

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private _http: HttpClient) {
  }

  findAllAccidents(page: number, pageSize: number): Observable<Page> {
    return this._http.get<Page>(`/api/accidents/filter?page=${page}&pageSize=${pageSize}`);
  }

  findAccidentById(id: number): Observable<Accident> {
    return this._http.get<Accident>(`/api/accidents/${id}`);
  }

  saveAccident(accidentRequest: any): Observable<any> {
    return this._http.post<any>('/api/accidents', accidentRequest);
  }

  saveParticipants(participants: Participant[], accidentId: number): Observable<AccidentParticipant[]> {
    return this._http.post<AccidentParticipant[]>(`/api/accident-participant/add/${accidentId}`, participants);
  }

  findAllParticipantsForAccident(accidentId: number): Observable<AccidentParticipant[]> {
    return this._http.get<AccidentParticipant[]>(`/api/accident-participant/${accidentId}`);
  }

  savePassengers(passengers: any, accidentId: number): Observable<Passenger[]> {
    return this._http.post<Passenger[]>(`/api/passengers/add/${accidentId}`, passengers);
  }

  findAllInjuredLevels(): Observable<Option[]> {
    return this._http.get<Option[]>('/api/passengers/injured-levels');
  }

  findAllGenders(): Observable<Option[]> {
    return this._http.get<Option[]>('/api/passengers/genders');
  }

  findAllPassengersForAccident(accidentId: number): Observable<Passenger[]> {
    return this._http.get<Passenger[]>(`/api/passengers/accident/${accidentId}`);
  }
}
