import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canSurface } from '../../data/can-surface';

interface styledSurface extends canSurface {
  style: string
}

@Component({
  selector: 'canbank-form-surface',
  templateUrl: './canbank-form-surface.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-surface.component.css']
})
export class CanbankFormSurfaceComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canSurfaceRows: styledSurface[] = [];
  openClass: string = '';

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanSurfaces();
  }

  // TODO:
  // classify style
  getCanSurfaces(): void {
    this.canbankXC.getSurface(0).subscribe(
      () => {
        this.canbankIF.canSurface.forEach((e) => {
          let eStyle = 'background-color:' + e.color + ';';
          eStyle += (e.default) ? 'border-style:solid;border-width:2px;border-color:white gray gray white;' : '';
          this.canSurfaceRows.push({
            id: e.id,
            name: e.name,
            color: e.color,
            default: e.default,
            style: eStyle
          });
        });
      },
      (error: any) => { console.error(error); }
    );
  }

  checkCanSurface(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, surface)
    return true;
  }

  submitCanSurface(): void {
    // TODO:
    // surface valid only when so far not exists
    // surface valid only when it fits htmlsurfaces array
    if (this.checkCanSurface()) {
      this.canbankXC.setSurface(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanSurface(id: number): void {
    let surface = this.canbankIF.canSurface.find(e => e.id == id);
    if (surface === undefined || surface.default === true) { return }
    this.canForm.value.canFormId = surface.id;
    this.canForm.value.canFormName = surface.name;
    this.canForm.value.canFormPicker = surface.color;
    this.canForm.value.canFormDefault = 1;

    this.canbankXC.updateSurface(this.canForm.value).subscribe(
      () => { location.reload(); },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanSurface(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteSurface(id).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      );
    }
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
