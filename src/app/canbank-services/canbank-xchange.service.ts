/*
* CAN-BANK EXCHANGE SERVICE
* calling REST API for data storing, reading, updating, deleting
* setting intermediate states using other services
*/

import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
// import { rejects } from 'assert';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankLevelmeterService } from './canbank-levelmeter.service';
import { CanbankInterfaceService } from './canbank-interface.service';

@Injectable({
  providedIn: 'root'
})
export class CanbankXchangeService {
  i18n = i18n[config.language];
  // TODO: read defaults from local file
  /*canColor = canColor;
  canContentType = canContentType;
  canCountry = canCountry;
  canLanguage = canLanguage;
  canMaterial = canMaterial;
  canSurface = canSurface;
  canType = canType;*/

  constructor(
    private canbankLM: CanbankLevelmeterService,
    private canbankIF: CanbankInterfaceService,
    private http: HttpClient) { }

  @Input()
  private _canbankMessage: string = '';
  get canbankMessage(): string { return this._canbankMessage; }
  set canbankMessage(msg: string) { this._canbankMessage = msg; }
  @Input()
  private _flashMessage: string = '';
  get flashMessage(): string { return this._flashMessage; }
  set flashMessage(msg: string) { this._flashMessage = msg; }
  @Input()
  private _flashMe: boolean = false;
  get flashMe(): boolean { return this._flashMe; }
  set flashMe(msg: boolean) { this._flashMe = msg; }

  public canbankUrl = config.serverUrl + config.apiPath;

  /*
  *   RESTful service description:
  *   script: /canbank  => GET: state, POST: createDB
  *     get state of the database, re/creates database and tables
  *   script: /counter     => GET: home-count
  *     get info for home subpage
  *   script: /bank     => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /color    => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /content  => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /contry   => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /language => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /material => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /surface  => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  *   script: /type     => POST: insert, GET:{0} stats {id} select, PUT:{id} update, DELETE:{id} delete
  */

  /*public canbankUrl: string {
    // let canbankUrl: string = '';
    if (location.origin.includes('localhost')) {
      canbankUrl = 'http://localhost';
    } else {
      canbankUrl = location.origin;
    }
    canbankUrl += '/api-can-bank'; // TODO: user config
    return canbankUrl;
  }*/

  // GET /canbank
  // getState - get state of the canBank
  // check connection, exiestence of database and tables
  public getState(): Observable<object> {
    return this.http.get(`${this.canbankUrl}/canbank`)
      .pipe(
        map((response: any) => {
          if (response['status'] === 'error') {
            this.canbankLM.levelDb = this.canbankLM.levelDt = 'error';
            this._canbankMessage = response['message'];
            if (response['message'].includes('Unknown database')) {
              this._canbankMessage = this.i18n.msg_db_nexists;
              this._flashMe = true;
              this._flashMessage = this.i18n.msg_create;
            } else if (typeof response['message'] === 'object' || response['message'].includes('Table')) {
              this.canbankLM.levelDb = 'success';
              this._flashMe = true;
              this._flashMessage = this.i18n.msg_recreate;
            }
            console.error(response['message']);
          } else {
            this.canbankLM.levelDb = this.canbankLM.levelDt = 'success';
            if (response['message'] == 'Database ready!') {
              this._canbankMessage = this.i18n.msg_db_ready;
            }
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelDb =
            this.canbankLM.levelDt = 'error';
          if (error.statusText.includes('Unknown Error')) {
            this._canbankMessage = this.i18n.msg_connection_error;
          } else {
            this._canbankMessage = error.statusText;
          }
          return this.handleError(error);
        })
      )
  }

  // POST /canbank
  // createDB - "set" state of the canBank
  // create database and tables
  public createDB(): Observable<object> {
    return this.http.post(`${this.canbankUrl}/canbank`, {})
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public prefillDB(): Observable<object> {
    return this.http.post(`${this.canbankUrl}/db_prefill`, {})
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  // GET /counter?table
  // getCount - get count of items of requested table
  public getCount(table: string): Observable<object> {
    const params = new HttpParams()
      .set('table', table);
    return this.http.get(`${this.canbankUrl}/counter`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  // GET /counter?table&fnc
  // getOldest - get oldest can in database
  public getOldest(): Observable<object> {
    const params = new HttpParams()
      .set('table', 'bank')
      .set('fnc', 'oldest');
    return this.http.get(`${this.canbankUrl}/counter`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      );
  }

  // GET /counter?table&fnc
  // getNewest - get newest can in database
  public getNewest(): Observable<object> {
    const params = new HttpParams()
      .set('table', 'bank')
      .set('fnc', 'newest');
    return this.http.get(`${this.canbankUrl}/counter`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      );
  }

  // GET /color?id
  // getColor - get list of colors (id = 0) or color by id (!= 0)
  public getColor(id: number = 0): Observable<object> {
    this.canbankLM.levelL1 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/color`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL1 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL1 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canColor = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL1 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  // POST /color?formdata
  // setColor - save new color
  public setColor(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/color`, { "data": formdata })
      .pipe(
        map((response: any) => { return response; }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  // PUT /color?formdata
  // updateColor - update existing color
  public updateColor(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/color`, { "data": formdata })
      .pipe(
        map((response: any) => { return response; }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  // DELETE /color?id
  // deleteColor - delete color
  public deleteColor(id: number): Observable<object> {
    const params = new HttpParams()
    .set("id", id );
    return this.http.delete(`${this.canbankUrl}/color`, { params })
    .pipe(
      map((response: any) => { return response; }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return this.handleError(error);
      })
    )
  }

  // GET /content?id
  // getContentType - get list of content types (id = 0) or content type by id (!= 0)
  public getContentType(id: number = 0): Observable<object> {
    this.canbankLM.levelL2 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/content`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL2 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL2 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canContentType = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL2 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setContentType(formdata: object) { }

  // GET /country?id
  // getCountry - get list of countries (id = 0) or country by id (!= 0)
  public getCountry(id: number = 0): Observable<object> {
    this.canbankLM.levelL3 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/country`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL3 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL3 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canCountry = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL3 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setCountry(formdata: object) { }

  // GET /language?id
  // getLanguage - get list of languages (id = 0) or language by id (!= 0)
  public getLanguage(id: number = 0): Observable<object> {
    this.canbankLM.levelL4 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/language`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL4 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL4 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canLanguage = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL4 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setLanguage(formdata: object) { }

  // GET /material?id
  // getMaterial - get list of materials (id = 0) or material by id (!= 0)
  public getMaterial(id: number = 0): Observable<object> {
    this.canbankLM.levelL5 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/material`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL5 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL5 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canMaterial = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL5 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setMaterial(formdata: object) { }

  // GET /surface?id
  // getSurface - get list of surfaces (id = 0) or surface by id (!= 0)
  public getSurface(id: number = 0): Observable<object> {
    this.canbankLM.levelL6 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/surface`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL6 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL6 = (/*response['list'] && */response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canSurface = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL6 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setSurface(formdata: object) { }

  // GET /type?id
  // getType - get list of types (id = 0) or type by id (!= 0)
  public getType(id: number = 0): Observable<object> {
    this.canbankLM.levelL7 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/type`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            this.canbankLM.levelL7 = 'error';
            console.error(response['message']);
          } else {
            this.canbankLM.levelL7 = (response['list'].length == 0) ? 'empty' : 'success';
            this.canbankIF.canType = response['list'];
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL7 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setType(formdata: object) { }

  // getBank -
  public getBank(id: number, text?: string): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
      .set('text', text!);
    return this.http.get(`${this.canbankUrl}/bank`, { params })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error)
          return this.handleError(error);
        })
      )
  }

  // setBank -
  public setBank(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/bank`, { "data": formdata })
      .pipe(
        map((response: any) => {
          if (response['status'] == 'error') {
            console.error(response['message']);
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  /*
  * function checkLists()
  *  background refresh db => interface structures (add form presets)
  */
  public async checkLists() {
    try {
      await this.getColor().toPromise();
      await this.getContentType().toPromise();
      await this.getCountry().toPromise();
      await this.getLanguage().toPromise();
      await this.getMaterial().toPromise();
      await this.getSurface().toPromise();
      await this.getType().toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<object> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}
