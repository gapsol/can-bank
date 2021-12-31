import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Car {
  model: string;
  price: number;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CanbankAddService {
  baseUrl = 'http://localhost/api';

  constructor(private http: HttpClient  ) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/add`).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
