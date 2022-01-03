import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <canbank-head></canbank-head>
    <canbank-menu></canbank-menu>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'can-bank';
  changeLog: string[] = [];

  constructor() {}

  /*ngOnChanges(changes: SimpleChanges): void {
    console.log('APP comp ngOnChanges')
    const log: string[] = [];
    for (const propName in changes) {
      console.log(propName)
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }*/

  ngOnInit() {
    console.log('APP component')
  }

}
