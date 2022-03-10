import { TestBed } from '@angular/core/testing';

import { CanbankErrorService } from './canbank-error.service';

describe('CanbankErrorService', () => {
  let service: CanbankErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
