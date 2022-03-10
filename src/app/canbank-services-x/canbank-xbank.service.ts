import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { CanbankLevelmeterService } from '../canbank-services/canbank-levelmeter.service';
import { CanbankMessageService } from '../canbank-services/canbank-message.service';
import { CanbankErrorService } from '../canbank-services/canbank-error.service';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CanbankXbankService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // getBank
  // 1. check existence of the database (NO id | NE id | id 0)
  // 2. read state of existing database
  // 3. get item with id
  // 4. search items with requested text
  public getBank(id: number, text?: string): Observable<object> {
    let params = new HttpParams();
    params = params.set('id', id);
    if (text) { params = params.set('text', text); }
    return this.http.get(`${this.canbankUrl}/bank`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL0 = (response['list'].length === 0) ? 'empty' : 'success';
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL0 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  // setBank - writes new item
  public setBank(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/bank`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public uploadBank(formdata: FormData): Observable<any> {
    let progress = 0;
    return this.http.post(`${this.canbankUrl}/bank_files`, formdata, {
      reportProgress: true,
      observe: 'events',
      // transformRequest: angular.identity,
      // headers: { 'Content-Type': 'file' } // multipart/form-data
    }).pipe(
      map(response => {
        switch (response.type) {
          // 0:Sent 1:UploadProgress 2:ResponseHeader 3:DownloadProgress 4:Response 5:User
          case HttpEventType.UploadProgress:
            progress = (response.total) ? Math.round(response.loaded * 100 / response.total) : 0;
            return { response: response, progress: progress };
          case HttpEventType.Response:
            return { response: response, progress: progress };
          default:
            return { response: response, progress: progress };
        }
      }
      ),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return of(error);
        /*formdata.inProgress = false;
        return of(`${formdata.data.name} upload failed.`);*/
      }))
  }

  // updateBank - updates existing item
  public updateBank(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/bank`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  // deleteBank - deletes item with id
  public deleteBank(id: number): Observable<object> {
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
