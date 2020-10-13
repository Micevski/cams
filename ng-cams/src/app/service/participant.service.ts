import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../interfaces/participant.interface';
import { Page } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private _http: HttpClient) { }

  findByRegisterPlate(plate: string): Observable<Participant> {
    return this._http.get<Participant>(`api/accident-participant/participant/plate/${plate}`);
  }

  findAllParticipants(page: number, pageSize: number) {
    return this._http.get<Page>(`/api/accident-participant/filter?page=${page}&pageSize=${pageSize}`);

  }
}
