/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankLangService } from './canbank-language.service';

describe('Service: CanbankLang', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankLangService]
    });
  });

  it('should ...', inject([CanbankLangService], (service: CanbankLangService) => {
    expect(service).toBeTruthy();
  }));
});
