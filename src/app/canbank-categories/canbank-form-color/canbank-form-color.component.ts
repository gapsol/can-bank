import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXcolorService } from '../../canbank-services-x/canbank-xcolor.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canColor } from '../../data/can.interface';

interface styledColor extends canColor {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-color',
  templateUrl: './canbank-form-color.component.html',
  styleUrls: ['../canbank-categories.component.css']
})
export class CanbankFormColorComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormColor: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canColorRows: styledColor[] = [];
  openClass: string = '';

  constructor(
    private canbankXCol: CanbankXcolorService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanColors(),
      error => console.error(error)
    )
  }

  getCanColors(): void {
    this.canbankXCol.getColor().subscribe(
      () => {
        this.canColorRows = [];
        let dftColor = this.canbankIF.canDefaults['color'];
        this.canbankIF.canColor.forEach(e => {
          let eStyle = 'background-color:' + e.color + ';';
          let eClass = (dftColor === e.id) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftColor !== e.id);
          // TODO: refine define removement
          // TODO: collpase/expand table effect
          this.canColorRows.push({
            id: e.id,
            name: e.name,
            color: e.color,
            code: e.code,
            default: eDefault,
            removable: eRemove,
            style: eStyle,
            class: eClass,
          })
        })
        window.scroll(0, 0);
      },
      error => console.error(error)
    )
  }

  deleteCanColor(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXCol.deleteColor(id).subscribe(
        () => this.getCanColors(),
        error => console.error(error)
      )
    }
  }

  checkColorPicker(mode: string): void {
    let pick;
    switch (mode) {
      case 'color':
        pick = htmlColors.find(item => {
          return item.name.toLowerCase() === this.canForm.value.canFormColor.toLowerCase();
        })
        if (pick) {
          this.canForm.patchValue({ canFormPicker: pick.code });
        }
        break;
      case 'picker':
        pick = htmlColors.find(item => {
          return item.code.toLowerCase() === this.canForm.value.canFormPicker.toLowerCase();
        })
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
      this.canbankXCol.setColor(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanColors(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanColor(id: number): void {
    let color = this.canbankIF.canColor.find(e => e.id === id);
    if (color === undefined || color.default === true) { return }
    this.canForm.value.canFormId = color.id;
    this.canbankXCol.defaultColor(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanColors(),
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
