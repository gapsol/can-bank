import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canContentType } from '../../data/can-content';

interface styledContentType extends canContentType {
  style: string,
  class: string
}

@Component({
  selector: 'canbank-form-content',
  templateUrl: './canbank-form-content.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-content.component.css']
})
export class CanbankFormContentComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canContentRows: styledContentType[] = [];
  openClass: string = '';

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanContents();
  }

  getCanContents(): void {
    this.canbankXC.getContentType(0).subscribe(
      () => {
        this.canbankIF.canContentType.forEach((e) => {
          let eStyle = 'background-color:silver;';
          let eClass = (e.default) ? 'btn-default' : '';
          this.canContentRows.push({
            id: e.id,
            name: e.name,
            default: e.default,
            style: eStyle,
            class: eClass
          });
        });
      },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanContent(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteContentType(id).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      );
    }
  }

  checkCanContent(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, content)
    return true;
  }

  submitCanContent(): void {
    // TODO:
    // content valid only when so far not exists
    // content valid only when it fits htmlcontents array
    if (this.checkCanContent()) {
      this.canbankXC.setContentType(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanContent(id: number): void {
    let content = this.canbankIF.canContentType.find(e => e.id === id);
    if (content === undefined || content.default === true) { return }
    this.canForm.value.canFormId = content.id;
    this.canForm.value.canFormName = content.name;
    this.canForm.value.canFormDefault = 1;
    this.canbankXC.updateContentType(this.canForm.value).subscribe(
      () => { location.reload(); },
      (error: any) => { console.error(error); }
    );
  }

  openForm() {
    this.openClass = 'btn-open';
    setTimeout(() => {
      let element = document.getElementById('openBtn');
      if (element) {
        element.scrollIntoView(true);
      }
    });
  }

}
