/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanbankAddComponent } from './canbank-add.component';

describe('CanbankAddComponent', () => {
  let component: CanbankAddComponent;
  let fixture: ComponentFixture<CanbankAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanbankAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
