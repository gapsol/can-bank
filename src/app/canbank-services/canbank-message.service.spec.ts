import { TestBed } from '@angular/core/testing';

import { CanbankMessageService } from './canbank-message.service';

describe('CanbankMessageService', () => {
  let service: CanbankMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanbankMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
