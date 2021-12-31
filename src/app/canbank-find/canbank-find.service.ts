import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Can } from './canbank-find';

@Injectable({
  providedIn: 'root'
})
export class CanbankFindService {
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient  ) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/get`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

  store(can: Can) {
    return this.http.post(`${this.baseUrl}/post`, { data: can }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
