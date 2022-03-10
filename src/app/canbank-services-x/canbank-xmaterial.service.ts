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
export class CanbankXmaterialService {
  public canbankUrl = config.serverUrl + config.apiPath;

  constructor(
    private http: HttpClient,
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService,
  ) { }

  // GET /material?id
  // getMaterial - get list of materials (id = 0) or material by id (!= 0)
  public getMaterial(id: number = 0): Observable<object> {
    this.canbankLM.levelL5 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/material`, { params })
      .pipe(
        map((response: any) => {
          this.canbankLM.levelL5 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canMaterial = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL5 = 'error';
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public setMaterial(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/material`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

  public updateMaterial(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/material`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }
  public defaultMaterial(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/material`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }


  public deleteMaterial(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/material`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.canbankER.handleError(error);
        })
      )
  }

}
