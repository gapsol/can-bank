import { TestBed } from '@angular/core/testing';

import { CanbankXcolorService } from './canbank-xcolor.service';

describe('CanbankXcolorService', () => {
  let service: CanbankXcolorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXcolorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
