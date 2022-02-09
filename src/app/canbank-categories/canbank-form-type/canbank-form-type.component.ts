import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { config } from '../../config/config';
import { i18n } from '../../data/can-i18n';
import { CanbankXchangeService } from '../../canbank-services/canbank-xchange.service';
import { CanbankInterfaceService } from '../../canbank-services/canbank-interface.service';
import { canType } from '../../data/can-type';

interface styledType extends canType {
  style: string,
  class: string
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
    private canbankXC: CanbankXchangeService,
    private canbankIF: CanbankInterfaceService
  ) { }

  ngOnInit() {
    this.getCanTypes();
  }

  getCanTypes(): void {
    this.canbankXC.getType(0).subscribe(
      () => {
        this.canbankIF.canType.forEach((e) => {
          let eStyle = 'background-color:silver;';
          let eClass = (e.default) ? 'btn-default' : '';
          this.canTypeRows.push({
            id: e.id,
            name: e.name,
            diameter: e.diameter,
            height: e.height,
            volume: e.volume,
            volumeFlOz: e.volumeFlOz,
            default: e.default,
            style: eStyle,
            class: eClass
          });
        });
      },
      (error: any) => { console.error(error); }
    );
  }

  deleteCanType(id: number) {
    if (confirm('You are about to delete record')) {
      this.canbankXC.deleteType(id).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      );
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
      this.canbankXC.setType(this.canForm.value).subscribe(
        () => { location.reload(); },
        (error: any) => { console.error(error); }
      )
    }
  }

  setDefaultCanType(id: number): void {
    let type = this.canbankIF.canType.find(e => e.id === id);
    if (type === undefined || type.default === true) { return }
    this.canForm.value.canFormId = type.id;
    this.canForm.value.canFormName = type.name;
    this.canForm.value.canFormDiameter = type.diameter;
    this.canForm.value.canFormHeight = type.height;
    this.canForm.value.canFormVolume = type.volume;
    this.canForm.value.canFormVolumeFlOz = type.volumeFlOz;
    this.canForm.value.canFormDefault = 1;
    this.canbankXC.updateType(this.canForm.value).subscribe(
      () => { location.reload(); },
      (error: any) => { console.error(error); }
    );
  }

  openForm() {
    this.openClass = 'btn-open';
    setTimeout(() => {
      let element = document.getElementById('openBtn');
      if (element) {
        element.scrollIntoView();
      }
    });
  }

}
