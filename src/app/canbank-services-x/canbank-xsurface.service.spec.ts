import { TestBed } from '@angular/core/testing';

import { CanbankXsurfaceService } from './canbank-xsurface.service';

describe('CanbankXsurfaceService', () => {
  let service: CanbankXsurfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXsurfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
