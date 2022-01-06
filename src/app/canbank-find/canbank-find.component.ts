import { Component, OnInit } from '@angular/core';
import { OnChanges } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Find } from './canbank-find';
import { CanbankFindService } from './canbank-find.service';
import { Can } from './canbank-find';

@Component({
  selector: 'canbank-find',
  templateUrl: './canbank-find.component.html',
  styleUrls: ['./canbank-find.component.css']
})
export class CanbankFindComponent implements OnInit {
  cans: Can[] = [];
  error = '';
  success = '';
  /*  canFindForm = this.formBuilder.group({
      name: ''
    });*/
  findMe = new Find('');

  constructor(private canbankFindService: CanbankFindService) { }
  //  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('FIND component');
    this.findMe.findString = 'cola';
    this.getCans();
  }

  getCans(): void {
    this.canbankFindService.getAll().subscribe(
      (data: Can[]) => {
        console.warn('data:');
        console.log(data);
        this.cans = data;
        this.success = 'successful retrieval of the list';
      },
      (err) => {
        console.error('error:');
        console.log(err);
        this.error = err;
      }
    );
  };

  ngOnChanges() {
    console.log('FIND on Change');
    console.log(this.findMe);
  }

  canFind() {
    console.log('can Find');

    /*console.log(this.findMe);
    console.log(this.findMe.findString);
    this.http.get<any>('https://www.gapsolutions.sk/api-can-bank/get.php').subscribe(data => {
      console.log('subscribe:');
      console.log(data);
    },
    err => {
      console.log('Error: ' + err.error);
      console.log('Name: ' + err.name);
      console.log('Message: ' + err.message);
      console.log('Status: ' + err.status);
   });*/
  }
}
/*
, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      observe: 'body',
    }
    */
