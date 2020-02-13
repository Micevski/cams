import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Participant} from "../interfaces/participant.interface";

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private _http: HttpClient) { }

  findAllAccidents() : Observable<any[]> {
    return this._http.get<any[]>('/api/accidents');
  }

  saveAccident(accidentRequest: any) : Observable<any>{
    return this._http.post<any>('/api/accidents', accidentRequest);
  }

  saveParticipants(participants: Participant[], accidentId: number) {
    return this._http.post<Participant[]>(`/api/accident-participant/add/${accidentId}`,participants)
  }
}
