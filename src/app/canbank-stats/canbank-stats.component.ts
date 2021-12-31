import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'canbank-stats',
  templateUrl: './canbank-stats.component.html',
  styleUrls: ['./canbank-stats.component.css']
})
export class CanbankStatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('STATS component')
  }

}
