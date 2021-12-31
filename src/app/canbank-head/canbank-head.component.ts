import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'canbank-head',
  templateUrl: './canbank-head.component.html',
  styleUrls: ['./canbank-head.component.css']
})
export class CanbankHeadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('HEAD component')
  }

}
