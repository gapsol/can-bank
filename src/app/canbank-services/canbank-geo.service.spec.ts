import { TestBed } from '@angular/core/testing';

import { CanbankGeoService } from './canbank-geo.service';

describe('CanbankGeoService', () => {
  let service: CanbankGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
