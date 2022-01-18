/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankLevelmeterService } from './canbank-levelmeter.service';

describe('Service: CanbankLm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankLevelmeterService]
    });
  });

  it('should ...', inject([CanbankLevelmeterService], (service: CanbankLevelmeterService) => {
    expect(service).toBeTruthy();
  }));
});
