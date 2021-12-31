import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanbanMenuComponent } from './canbank-menu.component';

describe('CanbankMenuComponent', () => {
  let component: CanbankMenuComponent;
  let fixture: ComponentFixture<CanbankMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanbankMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanbankMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
