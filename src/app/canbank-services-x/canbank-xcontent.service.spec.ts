import { TestBed } from '@angular/core/testing';

import { CanbankXcontentService } from './canbank-xcontent.service';

describe('CanbankXcontentService', () => {
  let service: CanbankXcontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXcontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
