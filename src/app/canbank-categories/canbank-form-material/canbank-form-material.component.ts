import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { htmlColors } from '../../data/html-colors';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canMaterial } from '../../data/can-material';

interface styledMaterial extends canMaterial {
  style: string
}

@Component({
  selector: 'canbank-form-material',
  templateUrl: './canbank-form-material.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-material.component.css']
})
export class CanbankFormMaterialComponent implements OnInit {
  i18n = i18n[config.language];
  openForm: boolean = false;
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormPicker: new FormControl('', Validators.required),
    canFormDefault: new FormControl()
  });
  canMaterialRows: styledMaterial[] = [];

  constructor(
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanMaterials();
  }

  // TODO:
  // classify style
  getCanMaterials(): void {
    this.canbankXC.getMaterial(0).subscribe(
      () => {
        this.canbankIF.canMaterial.forEach((e) => {
          let eStyle = 'background-color:' + e.color + ';';
          eStyle += (e.default) ? 'border-style:solid;border-width:2px;border-color:white gray gray white;' : '';
          this.canMaterialRows.push({
            id: e.id,
            name: e.name,
            abbr: e.abbr,
            color: e.color,
            default: e.default,
            style: eStyle
          });
        });
      },
      (error: any) => { console.error(error); }
    );
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
      this.canbankXC.setMaterial(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanMaterial(id: number): void {
    let material = this.canbankIF.canMaterial.find(e => e.id == id);
    if (material === undefined || material.default === true) { return }
    this.canForm.value.canFormId = material.id;
    this.canForm.value.canFormName = material.name;
    this.canForm.value.canFormPicker = material.color;
    this.canForm.value.canFormDefault = 1;

    this.canbankXC.updateMaterial(this.canForm.value).subscribe(
      () => { location.reload(); },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanMaterial(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteMaterial(id).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      );
    }
  }

}
