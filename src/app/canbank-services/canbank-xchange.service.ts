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
    private http: HttpClient
  ) { }

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
          // connection and database OK
          this.canbankLM.levelDa = this.canbankLM.levelDb = 'success';
          if (response['message'] === 'Database ready!') {
            // no missing table
            this._canbankMessage = this.i18n.msg_db_ready;
          } else if (response['message'].includes('Missing table')) {
            // some missing table(s)
            response.data.forEach((element: string) => {
              switch (element) {
                case 'level0': this.canbankLM.levelL0 = 'error'; break;
                case 'level1': this.canbankLM.levelL1 = 'error'; break;
                case 'level2': this.canbankLM.levelL2 = 'error'; break;
                case 'level3': this.canbankLM.levelL3 = 'error'; break;
                case 'level4': this.canbankLM.levelL4 = 'error'; break;
                case 'level5': this.canbankLM.levelL5 = 'error'; break;
                case 'level6': this.canbankLM.levelL6 = 'error'; break;
                case 'level7': this.canbankLM.levelL7 = 'error'; break;
              }
            });
            this._flashMe = true;
            this._flashMessage = this.i18n.msg_recreate;
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          switch (error.status) {
            case 0:
              this.canbankLM.levelDa = 'error';
              if (error.statusText.includes('Unknown Error')) {
                this._canbankMessage = this.i18n.msg_connection_error;
              } else {
                this._canbankMessage = error.statusText;
              }
              break;
            case 500:
              this.canbankLM.levelDa = 'success';
              if (error.error['message'].includes('Unknown database')) {
                this.canbankLM.levelDb = 'error';
                this._canbankMessage = this.i18n.msg_db_notfound;
                this._flashMe = true;
                this._flashMessage = this.i18n.msg_create;
              }
              break;
            default:
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
        map(response => response),
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
        map(response => response),
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
        map(response => response),
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
        map(response => response),
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
        map(response => response),
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
          this.canbankLM.levelL1 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canColor = response['list'];
          return response;
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
    return this.http.post(`${this.canbankUrl}/color`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
          return this.handleError(error);
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
          this.canbankLM.levelL2 = (response['list'].length === 0) ? 'empty' : 'success';
          this.canbankIF.canContentType = response['list'];
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankLM.levelL2 = 'error';
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setContentType(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/content`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public updateContentType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/content`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
          return this.handleError(error);
        })
      )
  }


  // GET /country?id
  // getCountry - get list of countries (id = 0) or country by id (!= 0)
  public getCountry(id: number = 0): Observable<object> {
    this.canbankLM.levelL3 = 'running';
    const params = new HttpParams()
      .set('id', id)
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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setCountry(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/country`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public updateCountry(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/country`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public deleteCountry(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/country`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  // GET /language?id
  // getLanguage - get list of languages (id = 0) or language by id (!= 0)
  public getLanguage(id: number = 0): Observable<object> {
    this.canbankLM.levelL4 = 'running';
    const params = new HttpParams()
      .set('id', id)
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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setLanguage(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/language`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public updateLanguage(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/language`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public deleteLanguage(id: number): Observable<object> {
    const params = new HttpParams()
      .set('id', id)
    return this.http.delete(`${this.canbankUrl}/language`, { params })
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setMaterial(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/material`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public updateMaterial(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/material`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
          return this.handleError(error);
        })
      )
  }

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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setSurface(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/surface`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error)
        })
      )
  }

  public updateSurface(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/surface`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
          return this.handleError(error);
        })
      )
  }

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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
        })
      )
  }

  public setType(formdata: object): Observable<object> {
    return this.http.post(`${this.canbankUrl}/type`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
        })
      )
  }

  public updateType(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/type`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
          return this.handleError(error);
        })
      )
  }

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
          this.canbankMessage = error.statusText;
          return this.handleError(error);
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
          return this.handleError(error);
        })
      )
  }

  // updateBank - updates existing item
  public updateBank(formdata: object): Observable<object> {
    return this.http.put(`${this.canbankUrl}/bank`, formdata)
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return this.handleError(error);
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
