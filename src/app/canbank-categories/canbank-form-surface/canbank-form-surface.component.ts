import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXsurfaceService } from '../../canbank-services-x/canbank-xsurface.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canSurface } from '../../data/can.interface';

interface styledSurface extends canSurface {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-surface',
  templateUrl: './canbank-form-surface.component.html',
  styleUrls: ['../canbank-categories.component.css']
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
    private canbankSfc: CanbankXsurfaceService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanSurfaces(),
      error => console.error(error)
    )
  }

  getCanSurfaces(): void {
    this.canbankSfc.getSurface().subscribe(
      () => {
        this.canSurfaceRows = [];
        let dftSurface = this.canbankIF.canDefaults['surface'];
        this.canbankIF.canSurface.forEach(e => {
          let eStyle = 'background-color:' + e.color + ';';
          let eClass = (dftSurface === e.id) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftSurface !== e.id);
          this.canSurfaceRows.push({
            id: e.id,
            name: e.name,
            color: e.color,
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

  deleteCanSurface(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankSfc.deleteSurface(id).subscribe(
        () => this.getCanSurfaces(),
        error => console.error(error)
      )
    }
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
      this.canbankSfc.setSurface(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanSurfaces(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanSurface(id: number): void {
    let surface = this.canbankIF.canSurface.find(e => e.id === id);
    if (surface === undefined || surface.default === true) { return }
    this.canForm.value.canFormId = surface.id;
    this.canbankSfc.defaultSurface(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanSurfaces(),
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
