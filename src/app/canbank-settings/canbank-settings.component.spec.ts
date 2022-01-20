import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbankSettingsComponent } from './canbank-settings.component';

describe('CanbankSettingsComponent', () => {
  let component: CanbankSettingsComponent;
  let fixture: ComponentFixture<CanbankSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
