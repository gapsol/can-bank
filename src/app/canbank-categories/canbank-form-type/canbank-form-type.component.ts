import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canType } from '../../data/can-type';

@Component({
  selector: 'canbank-form-content',
  templateUrl: './canbank-form-type.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-type.component.css']
})
export class CanbankFormTypeComponent implements OnInit {
  i18n = i18n[config.language];
  openForm: boolean = false;
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormColor: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormDefault: new FormControl()
  });
  canContentRows: canType[] = [];

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService) { }

  ngOnInit() {
    this.getCanContentTypes();
  }

  getCanContentTypes(): void {
    this.canbankXC.getContentType(0).subscribe(
      () => {
        this.canbankIF.canContentType.forEach((e) => {
          /*this.canContentRows.push({
            id: e.id,
            name: e.name,
            default: e.default
          });*/
        });
      },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanContentType(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteContentType(id).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      );
    }
  }

  checkColorPicker(mode: string): void {
    let pick;
    switch (mode) {
      case 'color':
        pick = htmlColors.find(item => {
          return item.name.toLowerCase() === this.canForm.value.canFormContent.toLowerCase();
        });
        if (pick) {
          this.canForm.patchValue({ canFormPicker: pick.code });
        }
        break;
      case 'picker':
        pick = htmlColors.find(item => {
          return item.code.toLowerCase() === this.canForm.value.canFormPicker.toLowerCase();
        });
        if (pick) {
          this.canForm.patchValue({ canFormContent: pick.name.toLowerCase() });
        }
        break;
    }
  }

  checkCanContentType(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, content)
    return true;
  }

  submitCanContentType(): void {
    // TODO:
    // content valid only when so far not exists
    // content valid only when it fits htmlcontents array
    if (this.checkCanContentType()) {
      this.canbankXC.setContentType(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanContentType(id: number): void {
    this.canbankXC.getContentType(id).subscribe(
      (data: any) => {
        this.canForm.value.canFormId = data['list'].id;
        this.canForm.value.canFormName = data['list'].name;
        this.canForm.value.canFormColor = data['list'].color;
        this.canForm.value.canFormPicker = data['list'].code;
        this.canForm.value.canFormDefault = 1;
        if (data['list'].default === '1') { return }
        this.canbankXC.updateContentType(this.canForm.value).subscribe(
          () => { location.reload(); },
          (error: any) => { console.error(error); }
        );
      },
      (error: any) => { console.error(error); }
    );
  }

}
