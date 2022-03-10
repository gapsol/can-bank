import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXcontentService } from '../../canbank-services-x/canbank-xcontent.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canContentType } from '../../data/can.interface';

interface styledContentType extends canContentType {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-content',
  templateUrl: './canbank-form-content.component.html',
  styleUrls: ['../canbank-categories.component.css']
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
    private canbankXCon: CanbankXcontentService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanContents(),
      error => console.error(error)
    )
  }

  getCanContents(): void {
    this.canbankXCon.getContentType().subscribe(
      () => {
        this.canContentRows = [];
        let dftContentType = this.canbankIF.canDefaults['content'];
        this.canbankIF.canContentType.forEach(e => {
          let eStyle = 'background-color:silver;';
          let eClass = (dftContentType === e.id) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftContentType !== e.id);
          this.canContentRows.push({
            id: e.id,
            name: e.name,
            default: eDefault,
            removable: eRemove,
            style: eStyle,
            class: eClass
          })
        })
        window.scroll(0, 0);
      },
      error => console.error(error)
    )
  }

  deleteCanContent(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXCon.deleteContentType(id).subscribe(
        () => this.getCanContents(),
        error => console.error(error)
      )
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
      this.canbankXCon.setContentType(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanContents(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanContent(id: number): void {
    let content = this.canbankIF.canContentType.find(e => e.id === id);
    if (content === undefined || content.default === true) { return }
    this.canForm.value.canFormId = content.id;
    this.canbankXCon.updateContentType(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanContents(),
          error => console.error(error)
        )
      },
      error => console.error(error)
    )
  }

  openForm() {
    this.openClass = 'btn-open';
    setTimeout(() => {
      let element = document.getElementById('openBtn');
      if (element) { element.scrollIntoView(true) }
    })
  }

}
