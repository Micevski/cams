import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Participant} from "../interfaces/participant.interface";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private _http: HttpClient) { }

  findByRegisterPlate(plate: string): Observable<Participant> {
    return this._http.get<Participant>(`api/accident-participant/participant/plate/${plate}`);
  }
}
