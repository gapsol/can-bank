import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';

import { config } from '../config/config';

@Component({
  selector: 'canbank-stats',
  templateUrl: './canbank-stats.component.html',
  styleUrls: ['./canbank-stats.component.css']
})
export class CanbankStatsComponent implements OnInit {
  fileToUpload: File | null = null;
  canbankUrl = config.serverUrl + config.apiPath;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    console.log('STATS component')
  }

  handleFileInput(event: any) {
    // console.log('handleFileInput')
    // console.log(event)
    this.fileToUpload = event.target.files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() { // fileUploadService.
    // console.log('uploadFileToActivity')
    const formData: FormData = new FormData();
    formData.append('fileKey', this.fileToUpload!, this.fileToUpload!.name);
    this.postFile(formData).subscribe(data => {
      // console.log('I GOT SOME DATA FROM UPLOAD ACTIVITY')
      console.log(data)
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }

  // canbankXC service
  postFile(formData: FormData): Observable<object> {
    // console.log('postFile')
    const endpoint = `${this.canbankUrl}/files`;
    // console.log(endpoint)
    // console.log(formData)
    return this.httpClient.post(endpoint, formData) //  , { headers: yourHeadersConfig }
      .pipe(
        map((response) => {
          // console.log('I ALREADY UPLOADED FILE');
          console.log(response);
          return response;
        }),
        catchError((e: HttpErrorResponse) => this.handleError(e))
      )
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
