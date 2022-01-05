import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbankFillComponent } from './canbank-fill.component';

describe('FillComponent', () => {
  let component: CanbankFillComponent;
  let fixture: ComponentFixture<CanbankFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankFillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
