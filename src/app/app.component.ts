import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <canbank-head></canbank-head>
    <canbank-menu></canbank-menu>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'can-bank';

  constructor() {}
  
}
