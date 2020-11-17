import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TwoDimensionAnalytic } from '../interfaces/two-dimension-analytic.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  API_PATH = 'api/analytics';

  constructor(private _http: HttpClient) { }

  getAccidentsCountsByDate(request?: any): Observable<TwoDimensionAnalytic> {
    return this._http.post<TwoDimensionAnalytic>(`${this.API_PATH}/accidents/date-grouped`, request);
  }

  getAccidentsCountByCity(request?: any): Observable<TwoDimensionAnalytic> {
    return this._http.post<TwoDimensionAnalytic>(`${this.API_PATH}/accidents/city-grouped`, request);
  }

  getAccidentsTimeSeries(request?: any): Observable<TwoDimensionAnalytic> {
    return this._http.post<TwoDimensionAnalytic>(`${this.API_PATH}/accidents/time-series`, request);
  }

  getPassengersAgeSeries(request?: any): Observable<TwoDimensionAnalytic> {
    return this._http.post<TwoDimensionAnalytic>(`${this.API_PATH}/passengers/age-series`, request);
  }


}
