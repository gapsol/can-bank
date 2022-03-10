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
export class CanbankXsurfaceService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /surface?id
  // getSurface - get list of surfaces (id = 0) or surface by id (!= 0)
  public getSurface(id: number = 0): Observable<object> {
    this.canbankLM.levelL6 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/surface`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL6 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canSurface = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL6 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setSurface(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/surface`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error)
        })
      )
  }

  public updateSurface(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/surface`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultSurface(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/surface`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }


  public deleteSurface(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/surface`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
