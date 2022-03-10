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
export class CanbankXdefaultService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /default?default
  // getColor - get list of colors (id = 0) or color by id (!= 0)
  public getDefault(table: string = 'can'): Observable<object> {
    this.canbankLM.levelL8 = 'running';
    const params = new HttpParams()
      .set('table', table)
    return this.http.get(`${this.canbankUrl}/default`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL8 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canDefault = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL8 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  // POST /default?formdata
  // setColor - save new color
  /*public setDefault(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/default`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }*/

  // PUT /default?formdata
  // updateColor - update existing color
  public updateDefault(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/default`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  // DELETE /default?table
  // deleteColor - delete color
  public deleteDefault(table: string): Observable<object> {
    const params = new HttpParams()
      .set("table", table);
    return this.http.delete(`${this.canbankUrl}/default`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
