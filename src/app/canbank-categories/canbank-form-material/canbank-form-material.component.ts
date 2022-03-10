import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXmaterialService } from '../../canbank-services-x/canbank-xmaterial.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canMaterial } from '../../data/can.interface';

interface styledMaterial extends canMaterial {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-material',
  templateUrl: './canbank-form-material.component.html',
  styleUrls: ['../canbank-categories.component.css']
})
export class CanbankFormMaterialComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormAbbr: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canMaterialRows: styledMaterial[] = [];
  openClass: string = '';

  constructor(
    private canbankXMtl: CanbankXmaterialService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanMaterials(),
      error => console.error(error)
    )
  }

  getCanMaterials(): void {
    this.canbankXMtl.getMaterial().subscribe(
      () => {
        this.canMaterialRows = [];
        let dftMaterial = this.canbankIF.canDefaults['material'];
        this.canbankIF.canMaterial.forEach(e => {
          let eStyle = 'background-color:' + e.color + ';';
          let eClass = (dftMaterial === e.id) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftMaterial !== e.id);
          this.canMaterialRows.push({
            id: e.id,
            name: e.name,
            abbr: e.abbr,
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

  deleteCanMaterial(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXMtl.deleteMaterial(id).subscribe(
        () => this.getCanMaterials(),
        error => console.error(error)
      )
    }
  }

  checkCanMaterial(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, material)
    return true;
  }

  submitCanMaterial(): void {
    // TODO:
    // material valid only when so far not exists
    // material valid only when it fits htmlmaterials array
    if (this.checkCanMaterial()) {
      this.canbankXMtl.setMaterial(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanMaterials(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanMaterial(id: number): void {
    let material = this.canbankIF.canMaterial.find(e => e.id === id);
    if (material === undefined || material.default === true) { return }
    this.canForm.value.canFormId = material.id;
    this.canbankXMtl.updateMaterial(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanMaterials(),
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
