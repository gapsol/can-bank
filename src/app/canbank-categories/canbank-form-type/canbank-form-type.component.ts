import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXtypeService } from '../../canbank-services-x/canbank-xtype.service';
import { CanbankXdefaultService } from '../../canbank-services-x/canbank-xdefault.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canType } from '../../data/can.interface';

interface styledType extends canType {
  style: string,
  class: string,
}

@Component({
  selector: 'canbank-form-content',
  templateUrl: './canbank-form-type.component.html',
  styleUrls: ['../canbank-categories.component.css', './canbank-form-type.component.css']
})
export class CanbankFormTypeComponent implements OnInit {
  i18n = i18n[config.language];
  canForm = new FormGroup({
    canFormId: new FormControl(),
    canFormName: new FormControl('', Validators.required),
    canFormDiameter: new FormControl('', Validators.required),
    canFormHeight: new FormControl('', Validators.required),
    canFormVolume: new FormControl('', Validators.required),
    canFormVolumeFlOz: new FormControl('', Validators.required),
    canFormDefault: new FormControl(false)
  });
  canTypeRows: styledType[] = [];
  openClass: string = '';

  constructor(
    private canbankXTyp: CanbankXtypeService,
    private canbankXDef: CanbankXdefaultService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.canbankXDef.getDefault().subscribe(
      () => this.getCanTypes(),
      error => console.error(error)
    )
  }

  getCanTypes(): void {
    this.canbankXTyp.getType().subscribe(
      () => {
        this.canTypeRows = [];
        let dftType = this.canbankIF.canDefaults['type'];
        this.canbankIF.canType.forEach(e => {
          let eStyle = 'background-color:silver;';
          let eClass = (dftType === e.id) ? 'btn-default' : '';
          let eDefault = !!eClass;
          let eRemove = (dftType !== e.id);
          // TODO: refine define removement
          // TODO: collpase/expand table effect
          this.canTypeRows.push({
            id: e.id,
            name: e.name,
            diameter: e.diameter,
            height: e.height,
            volume: e.volume,
            volumeFlOz: e.volumeFlOz,
            default: eDefault,
            removable: eRemove,
            style: eStyle,
            class: eClass,
          });
        });
        window.scroll(0, 0);
      },
      error => console.error(error)
    )
  }

  deleteCanType(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXTyp.deleteType(id).subscribe(
        () => this.getCanTypes(),
        error => console.error(error)
      )
    }
  }

  checkCanType(): boolean {
    // TODO:
    // check, if submit is possible due to:
    // existence of such record
    // usage of submitted values (name, content)
    return true;
  }

  submitCanType(): void {
    // TODO:
    // content valid only when so far not exists
    // content valid only when it fits htmlcontents array
    if (this.checkCanType()) {
      this.canbankXTyp.setType(this.canForm.value).subscribe(
        () => {
          this.canbankXDef.getDefault().subscribe(
            () => this.getCanTypes(),
            error => console.error(error)
          )
        },
        error => console.error(error)
      )
    }
  }

  setDefaultCanType(id: number): void {
    let type = this.canbankIF.canType.find(e => e.id === id);
    if (type === undefined || type.default === true) { return }
    this.canForm.value.canFormId = type.id;
    this.canbankXTyp.defaultType(this.canForm.value).subscribe(
      () => {
        this.canbankXDef.getDefault().subscribe(
          () => this.getCanTypes(),
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
