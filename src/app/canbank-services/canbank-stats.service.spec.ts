/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankStatsService } from './canbank-stats.service';

describe('Service: CanbankStats', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankStatsService]
    });
  });

  it('should ...', inject([CanbankStatsService], (service: CanbankStatsService) => {
    expect(service).toBeTruthy();
  }));
});
