import { TestBed } from '@angular/core/testing';

import { CanbankXlanguageService } from './canbank-xlanguage.service';

describe('CanbankXlanguageService', () => {
  let service: CanbankXlanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankXlanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
