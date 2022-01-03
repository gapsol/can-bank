import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';

import { config } from '../config/config';
import { canColor } from '../data/can-color';
import { canContentType } from '../data/can-content';
import { canCountry } from '../data/can-country';
import { canLanguage } from '../data/can-language';
import { canMaterial } from '../data/can-material';
import { canSurface } from '../data/can-surface';
import { canType } from '../data/can-type';

@Injectable({
  providedIn: 'root'
})
export class CanbankXsService {
  /*canColor = canColor;
  canContentType = canContentType;
  canCountry = canCountry;
  canLanguage = canLanguage;
  canMaterial = canMaterial;
  canSurface = canSurface;
  canType = canType;*/

  constructor(private http: HttpClient) { }

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

  @Input()
  private _canColor: Array<canColor> = [];
  get canColor(): Array<canColor> { return this._canColor; }
  set canColor(obj: Array<canColor>) { this._canColor = obj; }
  @Input()
  private _canContentType: Array<canContentType> = [];
  get canContentType(): Array<canContentType> { return this._canContentType; }
  set canContentType(obj: Array<canContentType>) { this._canContentType = obj; }
  @Input()
  private _canCountry: Array<canCountry> = [];
  get canCountry(): Array<canCountry> { return this._canCountry; }
  set canCountry(obj: Array<canCountry>) { this._canCountry = obj; }
  @Input()
  private _canLanguage: Array<canLanguage> = [];
  get canLanguage(): Array<canLanguage> { return this._canLanguage; }
  set canLanguage(obj: Array<canLanguage>) { this._canLanguage = obj; }
  @Input()
  private _canMaterial: Array<canMaterial> = [];
  get canMaterial(): Array<canMaterial> { return this._canMaterial; }
  set canMaterial(obj: Array<canMaterial>) { this._canMaterial = obj; }
  @Input()
  private _canSurface: Array<canSurface> = [];
  get canSurface(): Array<canSurface> { return this._canSurface; }
  set canSurface(obj: Array<canSurface>) { this._canSurface = obj; }
  @Input()
  private _canType: Array<canType> = [];
  get canType(): Array<canType> { return this._canType; }
  set canType(obj: Array<canType>) { this._canType = obj; }

  @Input()
  private _levelDb: string = '';
  get levelDb(): string { return this._levelDb; }
  set levelDb(str: string) { this._levelDb = str; }
  @Input()
  private _levelDt: string = '';
  get levelDt(): string { return this._levelDt; }
  set levelDt(str: string) { this._levelDt = str; }
  @Input()
  private _levelL1: string = '';
  get levelL1(): string { return this._levelL1; }
  set levelL1(str: string) { this._levelL1 = str; }
  @Input()
  private _levelL2: string = '';
  get levelL2(): string { return this._levelL2; }
  set levelL2(str: string) { this._levelL2 = str; }
  @Input()
  private _levelL3: string = '';
  get levelL3(): string { return this._levelL3; }
  set levelL3(str: string) { this._levelL3 = str; }
  @Input()
  private _levelL4: string = '';
  get levelL4(): string { return this._levelL4; }
  set levelL4(str: string) { this._levelL4 = str; }
  @Input()
  private _levelL5: string = '';
  get levelL5(): string { return this._levelL5; }
  set levelL5(str: string) { this._levelL5 = str; }
  @Input()
  private _levelL6: string = '';
  get levelL6(): string { return this._levelL6; }
  set levelL6(str: string) { this._levelL6 = str; }
  @Input()
  private _levelL7: string = '';
  get levelL7(): string { return this._levelL7; }
  set levelL7(str: string) { this._levelL7 = str; }

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
        console.log('XS getState response')
        console.log(response)
        if (response.data.status === 'error') {
          this._levelDb = this._levelDt = 'error';
          this._canbankMessage = response.data.message;
          if (response.data.message.includes('Unknown database')) {
            this._canbankMessage = 'Database doesn\'t exist!';
            this._flashMe = true;
            this._flashMessage = 'Create database!';
          } else if (typeof response.data.message == 'object' || response.data.message.includes('Table')) {
            this._levelDb = 'success';
            this._flashMe = true;
            this._flashMessage = 'Recreate database!';
          }
          return throwError(response.data.message);
        } else {
          this._levelDb = this._levelDt = 'success';
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('XS getState error')
        console.error(error);
        this._levelDb =
        this._levelDt = 'error';
        if (error.statusText.includes('Unknown Error')) {
          this._canbankMessage = 'Connection error!';
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
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
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
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
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
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
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
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return this.handleError(error);
      })
    );
  }

  // getLists - run all functions for obtaining lists of categories for form selects
  /*public getLists(): boolean {
    // TODO: process errors as FE error message
    this.getColor(0).subscribe(
      (response: any) => {
        this._canColor = response['list'];
        this._levelL1 = 'success';
      },
      (error: any) => {
        this._levelL1 = 'error';
        console.log(error);
      }
    );
    this.getContentType(0).subscribe(
      (response: any) => {
        this._canContentType = response['list'];
        this._levelL2 = 'success';
      },
      (error: any) => {
        this._levelL2 = 'error';
        console.log(error);
      }
    );
    this.getCountry(0).subscribe(
      (response: any) => {
        this._canCountry = response['list'];
        this._levelL3 = 'success';
      },
      (error: any) => {
        this._levelL3 = 'error';
        console.log(error);
      }
    );
    this.getLanguage(0).subscribe(
      (response: any) => {
        this._canLanguage = response['list'];
        this._levelL4 = 'success';
      },
      (error: any) => {
        this._levelL4 = 'error';
        console.log(error);
      }
    );
    this.getMaterial(0).subscribe(
      (response: any) => {
        this._canMaterial = response['list'];
        this._levelL5 = 'success';
      },
      (error: any) => {
        this._levelL5 = 'error';
        console.log(error);
      }
    );
    this.getSurface(0).subscribe(
      (response: any) => {
        this._canSurface = response['list'];
        this._levelL6 = 'success';
      },
      (error: any) => {
        this._levelL6 = 'error';
        console.log(error);
      }
    );
    this.getType(0).subscribe(
      (response: any) => {
        this._canType = response['list'];
        this._levelL7 = 'success';
      },
      (error: any) => {
        this._levelL7 = 'error';
        console.log(error);
      }
    );
    return true;
  }*/

  // GET /color?id
  // getColor - get list of colors (id = 0) or color by id (!= 0)
  public getColor(id: number): Observable<object> {
    this._levelL1 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/color`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL1 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL1 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL1 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL1 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /content?id
  // getContentType - get list of content types (id = 0) or content type by id (!= 0)
  public getContentType(id: number): Observable<object> {
    this._levelL2 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/content`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL2 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL2 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL2 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL2 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /country?id
  // getCountry - get list of countries (id = 0) or country by id (!= 0)
  public getCountry(id: number): Observable<object> {
    this._levelL3 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/country`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL3 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL3 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL3 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL3 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /language?id
  // getLanguage - get list of languages (id = 0) or language by id (!= 0)
  public getLanguage(id: number): Observable<object> {
    this._levelL4 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/language`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL4 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL4 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL4 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL4 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /material?id
  // getMaterial - get list of materials (id = 0) or material by id (!= 0)
  public getMaterial(id: number): Observable<object> {
    this._levelL5 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/material`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL5 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL5 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL5 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL5 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /surface?id
  // getSurface - get list of surfaces (id = 0) or surface by id (!= 0)
  public getSurface(id: number): Observable<object> {
    this._levelL6 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/surface`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL6 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL6 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL6 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL6 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // GET /type?id
  // getType - get list of types (id = 0) or type by id (!= 0)
  public getType(id: number): Observable<object> {
    this._levelL7 = 'running';
    const params = new HttpParams()
      .set('id', id)
    return this.http.get(`${this.canbankUrl}/type`, { params }).pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          this._levelL7 = 'error';
          return throwError(response['data']['message']);
        }
        this._levelL7 = 'success';
        if (/*response['data']['list'] && */response['data']['list'].length == 0) {
          this._levelL7 = 'empty';
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this._levelL7 = 'error';
        this.canbankMessage = error.statusText;
        return this.handleError(error);
      })
    )
  }

  // getBank -
  public getBank(): Observable<object> {
    console.log('getBank')
    return this.http.get(`${this.canbankUrl}/bank`)
    .pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error)
        return this.handleError(error);
      })
    )
  }

  // setBank -
  public setBank(formdata: object): Observable<object> {
    console.log('setBank')
    console.log(formdata)
    return this.http.post(`${this.canbankUrl}/bank`, {"data": formdata})
    .pipe(
      map((response: any) => {
        if (response['data']['status'] == 'error') {
          return throwError(response['data']['message']);
        }
        return response['data'];
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return this.handleError(error);
      })
    )
  }

  private handleError(error: HttpErrorResponse): Observable<object> {
    console.log('handleError')
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
