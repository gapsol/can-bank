/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankFindService } from './canbank-find.service';

describe('Service: CanbankFind', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankFindService]
    });
  });

  it('should ...', inject([CanbankFindService], (service: CanbankFindService) => {
    expect(service).toBeTruthy();
  }));
});
