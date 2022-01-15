/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankXcService } from './canbank-xchange.service';

describe('Service: canbankXC', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankXcService]
    });
  });

  it('should ...', inject([CanbankXcService], (service: CanbankXcService) => {
    expect(service).toBeTruthy();
  }));
});
