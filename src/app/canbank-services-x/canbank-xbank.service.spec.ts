import { TestBed } from '@angular/core/testing';

import { CanbankXbankService } from './canbank-xbank.service';

describe('CanbankXbankService', () => {
  let service: CanbankXbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
