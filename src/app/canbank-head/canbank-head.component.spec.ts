import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbankHeadComponent } from './canbank-head.component';

describe('CanbankHeadComponent', () => {
  let component: CanbankHeadComponent;
  let fixture: ComponentFixture<CanbankHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
