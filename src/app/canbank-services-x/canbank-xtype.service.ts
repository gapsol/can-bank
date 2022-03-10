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
export class CanbankXtypeService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /type?id
  // getType - get list of types (id = 0) or type by id (!= 0)
  public getType(id: number = 0): Observable<object> {
    this.canbankLM.levelL7 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/type`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL7 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canType = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL7 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setType(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/type`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public updateType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/type`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/type`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public deleteType(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/type`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
