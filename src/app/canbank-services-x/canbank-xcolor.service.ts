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
export class CanbankXcolorService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /color?id
  // getColor - get list of colors (id = 0) or color by id (!= 0)
  public getColor(id: number = 0): Observable<object> {
    this.canbankLM.levelL1 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/color`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL1 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canColor = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL1 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  // POST /color?formdata
  // setColor - save new color
  public setColor(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/color`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  // PUT /color?formdata
  // updateColor - update existing color
  public updateColor(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/color`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultColor(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/color`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  // DELETE /color?id
  // deleteColor - delete color
  public deleteColor(id: number): Observable<object> {
    const params = new HttpParams()
      .set("id", id);
    return this.http.delete(`${this.canbankUrl}/color`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
