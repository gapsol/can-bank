/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankLmService } from './canbank-lmeter.service';

describe('Service: CanbankLm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankLmService]
    });
  });

  it('should ...', inject([CanbankLmService], (service: CanbankLmService) => {
    expect(service).toBeTruthy();
  }));
});
