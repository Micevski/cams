import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private _http: HttpClient) { }

  upload(file: FormData, accidentId: number): Observable<any> {
    return this._http.post<any>(`api/documents/upload/${accidentId}`, file);
  }
}
