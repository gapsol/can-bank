import { TestBed } from '@angular/core/testing';

import { CanbankInterfaceService } from './canbank-interface.service';

describe('CanbankInterfaceService', () => {
  let service: CanbankInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
