/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankRecordService } from './canbank-record.service';

describe('Service: CanbankRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankRecordService]
    });
  });

  it('should ...', inject([CanbankRecordService], (service: CanbankRecordService) => {
    expect(service).toBeTruthy();
  }));
});
