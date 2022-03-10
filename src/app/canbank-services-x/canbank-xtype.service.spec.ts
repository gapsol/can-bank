import { TestBed } from '@angular/core/testing';

import { CanbankXtypeService } from './canbank-xtype.service';

describe('CanbankXtypeService', () => {
  let service: CanbankXtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
