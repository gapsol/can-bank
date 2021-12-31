import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbankBodyComponent } from './canbank-body.component';

describe('CanbankBodyComponent', () => {
  let component: CanbankBodyComponent;
  let fixture: ComponentFixture<CanbankBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
