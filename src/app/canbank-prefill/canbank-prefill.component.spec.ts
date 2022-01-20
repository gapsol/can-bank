import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbankPrefillComponent } from './canbank-prefill.component';

describe('PrefillComponent', () => {
  let component: CanbankPrefillComponent;
  let fixture: ComponentFixture<CanbankPrefillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankPrefillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankPrefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
