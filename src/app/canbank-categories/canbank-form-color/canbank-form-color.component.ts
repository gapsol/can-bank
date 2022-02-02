import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canColor } from '../../data/can-color';

interface styledColor extends canColor {
  style: string
}

@Component({
  selector: 'canbank-form-color',
  templateUrl: './canbank-form-color.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-color.component.css']
})
export class CanbankFormColorComponent implements OnInit {
  i18n = i18n[config.language];
  openForm: boolean = false;
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormColor: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormDefault: new FormControl()
  });
  canColorRows: styledColor[] = [];

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService) { }

  ngOnInit() {
    this.getCanColors();
    this.checkColorPicker('picker');
  }

  getCanColors(): void {
    this.canbankXC.getColor(0).subscribe(
      () => {
        this.canbankIF.canColor.forEach((e) => {
          let eStyle = 'background-color:' + e.color;
          eStyle += (e.default) ? ';border: 3px solid black;' : '';
          this.canColorRows.push({
            id: e.id,
            name: e.name,
            color: e.color,
            default: e.default,
            style: eStyle
          });
        });
      },
      (error) => { console.error(error); }
    );
  }

  deleteCanColor(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteColor(id).subscribe(
        () => { location.reload(); },
        error => { console.error(error); }
      );
    }
  }

  checkColorPicker(mode: string): void {
    let pick;
    switch (mode) {
      case 'color':
        pick = htmlColors.find(item => {
          return item.name.toLowerCase() === this.canForm.value.canFormColor.toLowerCase();
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
          this.canForm.patchValue({ canFormColor: pick.name.toLowerCase() });
        }
        break;
    }
  }

  checkCanColor(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, color)
    return true;
  }

  submitCanColor(): void {
    // TODO:
    // color valid only when so far not exists
    // color valid only when it fits htmlColors array
    if (this.checkCanColor()) {
      this.canbankXC.setColor(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error) => { console.error(error); }
      )
    }
  }

  setDefaultCanColor(id: number): void {
    this.canbankXC.getColor(id).subscribe(
      (data: any) => {
        this.canForm.value.canFormId = data['list'].id;
        this.canForm.value.canFormName = data['list'].name;
        this.canForm.value.canFormColor = data['list'].color;
        this.canForm.value.canFormDefault = 1;
        this.canbankXC.updateColor(this.canForm.value).subscribe(
          () => { location.reload(); },
          (error: any) => { console.error(error); }
        );
      },
      (error: any) => { console.error(error); }
    );
  }

}
