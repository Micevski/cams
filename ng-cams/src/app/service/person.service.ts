import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Person} from "../interfaces/person.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) {
  }

  findPersonByUniqueIdentifier(uniquePersonIdentifier: string): Observable<Person> {
    return this._http.get<Person>(`api/person/unique/${uniquePersonIdentifier}`);

  }
}
