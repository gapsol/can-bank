import { TestBed } from '@angular/core/testing';

import { CanbankXcountryService } from './canbank-xcountry.service';

describe('CanbankXcountryService', () => {
  let service: CanbankXcountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXcountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
