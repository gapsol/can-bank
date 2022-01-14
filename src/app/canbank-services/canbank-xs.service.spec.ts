/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankXsService } from './canbank-xs.service';

describe('Service: CanbankXs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankXsService]
    });
  });

  it('should ...', inject([CanbankXsService], (service: CanbankXsService) => {
    expect(service).toBeTruthy();
  }));
});
