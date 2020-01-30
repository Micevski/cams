import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private _http: HttpClient) { }

  findAllAccidents() : Observable<any[]> {
    return this._http.get<any[]>('/api/accidents');
  }
}
