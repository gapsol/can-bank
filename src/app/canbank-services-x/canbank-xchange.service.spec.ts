/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankXchangeService } from './canbank-xchange.service';

describe('Service: canbankXC', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankXchangeService]
    });
  });

  it('should ...', inject([CanbankXchangeService], (service: CanbankXchangeService) => {
    expect(service).toBeTruthy();
  }));
});
