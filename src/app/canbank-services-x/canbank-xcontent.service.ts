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
export class CanbankXcontentService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /content?id
  // getContentType - get list of content types (id = 0) or content type by id (!= 0)
  public getContentType(id: number = 0): Observable<object> {
    this.canbankLM.levelL2 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/content`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL2 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canContentType = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL2 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setContentType(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/content`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public updateContentType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/content`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultContentType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/content`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public deleteContentType(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/content`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
