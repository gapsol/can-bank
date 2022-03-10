import { TestBed } from '@angular/core/testing';

import { CanbankXdefaultService } from './canbank-xdefault.service';

describe('CanbankXdefaultService', () => {
  let service: CanbankXdefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXdefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
