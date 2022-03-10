import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

import { CanbankLevelmeterService } from '../canbank-services/canbank-levelmeter.service';
import { CanbankInterfaceService } from '../canbank-services/canbank-interface.service';
import { CanbankMessageService } from '../canbank-services/canbank-message.service';
import { CanbankErrorService } from '../canbank-services/canbank-error.service';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CanbankXcountryService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /country?id
  // getCountry - get list of countries (id = 0) or country by id (!= 0)
  public getCountry(abbr: string = ''): Observable<object> {
    this.canbankLM.levelL3 = 'running';
    const params = new HttpParams()
      .set('abbr', abbr)
    return this.http.get(`${this.canbankUrl}/country`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL3 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canCountry = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL3 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setCountry(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/country`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public updateCountry(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/country`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultCountry(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/country`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public deleteCountry(abbr: string): Observable<object> {
    const params = new HttpParams()
      .set('abbr', abbr)
    return this.http.delete(`${this.canbankUrl}/country`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
