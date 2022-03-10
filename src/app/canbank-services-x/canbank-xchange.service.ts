/*
* CAN-BANK EXCHANGE SERVICE
* calling REST API for data storing, reading, updating, deleting
* setting intermediate states using other services
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

import { config } from '../config/config';
import { i18n } from '../data/can-i18n';
import { CanbankXcolorService } from './canbank-xcolor.service';
import { CanbankXcontentService } from './canbank-xcontent.service';
import { CanbankXcountryService } from './canbank-xcountry.service';
import { CanbankXlanguageService } from './canbank-xlanguage.service';
import { CanbankXmaterialService } from './canbank-xmaterial.service';
import { CanbankXsurfaceService } from './canbank-xsurface.service';
import { CanbankXtypeService } from './canbank-xtype.service';
import { CanbankXdefaultService } from './canbank-xdefault.service';
import { CanbankLevelmeterService } from '../canbank-services/canbank-levelmeter.service';
import { CanbankMessageService } from '../canbank-services/canbank-message.service';
import { CanbankErrorService } from '../canbank-services/canbank-error.service';

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
    private http: HttpClient,
    private canbankXCol: CanbankXcolorService,
    private canbankXCon: CanbankXcontentService,
    private canbankXCty: CanbankXcountryService,
    private canbankXLng: CanbankXlanguageService,
    private canbankXMtl: CanbankXmaterialService,
    private canbankXSfc: CanbankXsurfaceService,
    private canbankXTyp: CanbankXtypeService,
    private canbankXDef: CanbankXdefaultService,
    private canbankLM: CanbankLevelmeterService,
    private canbankMsg: CanbankMessageService,
    private canbankER: CanbankErrorService
  ) { }

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
            this.canbankMsg.canbankMessage = this.i18n.msg_db_ready;
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
                case 'level8': this.canbankLM.levelL8 = 'error'; break;
              }
            });
            this.canbankMsg.flashMe = true;
            this.canbankMsg.flashMessage = this.i18n.msg_recreate;
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          switch (error.status) {
            case 0:
              this.canbankLM.levelDa = 'error';
              if (error.statusText.includes('Unknown Error')) {
                this.canbankMsg.canbankMessage = this.i18n.msg_connection_error;
              } else {
                this.canbankMsg.canbankMessage = error.statusText;
              }
              break;
            case 500:
              this.canbankLM.levelDa = 'success';
              if (error.error['message'].includes('Unknown database')) {
                this.canbankLM.levelDb = 'error';
                this.canbankMsg.canbankMessage = this.i18n.msg_db_notfound;
                this.canbankMsg.flashMe = true;
                this.canbankMsg.flashMessage = this.i18n.msg_create;
              }
              break;
            default:
          }
          return this.canbankER.handleError(error);
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
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
        })
      )
  }

  public prefillDB(): Observable<object> {
    return this.http.post(`${this.canbankUrl}/db_prefill`, {})
      .pipe(
        map(response => response),
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          this.canbankMsg.canbankMessage = error.statusText;
          return this.canbankER.handleError(error);
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
          return this.canbankER.handleError(error);
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
          return this.canbankER.handleError(error);
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
          return this.canbankER.handleError(error);
        })
      );
  }

  /*
  * function checkLists()
  *  background refresh db => interface structures (add form presets)
  */
  // TODO: ???.toPromise???
  public async checkLists() {
    try {
      await this.canbankXCol.getColor().toPromise();
      await this.canbankXCon.getContentType().toPromise();
      await this.canbankXCty.getCountry().toPromise();
      await this.canbankXLng.getLanguage().toPromise();
      await this.canbankXMtl.getMaterial().toPromise();
      await this.canbankXSfc.getSurface().toPromise();
      await this.canbankXTyp.getType().toPromise();
      await this.canbankXDef.getDefault().toPromise();
    } catch (error) {
      console.error(error);
    }
  }

}
