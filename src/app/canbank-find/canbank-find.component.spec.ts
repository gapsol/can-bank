/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CanbankFindComponent } from './canbank-find.component';

describe('CanbankFindComponent', () => {
  let component: CanbankFindComponent;
  let fixture: ComponentFixture<CanbankFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanbankFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
