import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Person } from '../interfaces/person.interface';
import { Page } from '../interfaces/page.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  logIn(email: string, password: string): Observable<boolean> {
    let formData: FormData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return this._http.post('/api/login', formData)
      .pipe(map(response => true), catchError(err => of(false)));
  }

  logout() {
    return this._http.get('/api/logout');
  }

  getAuthentication(): Observable<any> {
    return this._http.get<any>('/api/access/authentication');
  }

  createUser(password: string, personRequest: Person): Observable<any> {
    return this._http.post<any>(`/api/admin/add/user`, {
      personRequest: personRequest,
      password: password
    });
  }

  findAllUsers(page: number, pageSize: number): Observable<Page> {
    return this._http.get<Page>(`/api/admin/users/filter?page=${page}&pageSize=${pageSize}`);
  }

  findAllUsersFiltered(page: number, pageSize: number, $event: string) {
    return this._http.get<Page>(`/api/admin/users/filter?page=${page}&pageSize=${pageSize}&${$event}`);

  }
}
