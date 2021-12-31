import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'canbank-body',
  templateUrl: './canbank-body.component.html',
  styleUrls: ['./canbank-body.component.css']
})
export class CanbankBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('BODY component')
  }

}
