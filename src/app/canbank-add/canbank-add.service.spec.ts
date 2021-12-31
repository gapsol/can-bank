/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankAddService } from './canbank-add.service';

describe('Service: CanbankAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankAddService]
    });
  });

  it('should ...', inject([CanbankAddService], (service: CanbankAddService) => {
    expect(service).toBeTruthy();
  }));
});
