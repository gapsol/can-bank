import { TestBed } from '@angular/core/testing';

import { CanbankXmaterialService } from './canbank-xmaterial.service';

describe('CanbankXmaterialService', () => {
  let service: CanbankXmaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXmaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
