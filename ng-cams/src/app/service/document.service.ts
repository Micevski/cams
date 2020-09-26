import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Document} from "../interfaces/document-interface";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private _http: HttpClient) {
  }

  upload(file: FormData, accidentId: number): Observable<any> {
    return this._http.post<any>(`api/documents/upload/${accidentId}`, file);
  }

  findAllDocumentsForAccident(accidentId: number): Observable<any[]> {
    return this._http.get<any[]>(`api/documents/${accidentId}`);
  }

  deleteAccidentDocument(documentId: number, accidentId: number): Observable<Document[]> {
    return this._http.delete<Document[]>(`api/documents/accident/${accidentId}/document/${documentId}`);
  }
}
