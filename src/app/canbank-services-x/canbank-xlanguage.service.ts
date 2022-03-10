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
export class CanbankXlanguageService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /language?id
  // getLanguage - get list of languages (id = 0) or language by id (!= 0)
  public getLanguage(abbr: string = ''): Observable<object> {
    this.canbankLM.levelL4 = 'running';
    const params = new HttpParams()
      .set('abbr', abbr)
    return this.http.get(`${this.canbankUrl}/language`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL4 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canLanguage = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL4 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setLanguage(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/language`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public updateLanguage(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/language`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultLanguage(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/language`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public deleteLanguage(abbr: string): Observable<object> {
    const params = new HttpParams()
      .set('abbr', abbr)
    return this.http.delete(`${this.canbankUrl}/language`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
