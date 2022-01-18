/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanbankLanguageService } from './canbank-language.service';

describe('Service: CanbankLang', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanbankLanguageService]
    });
  });

  it('should ...', inject([CanbankLanguageService], (service: CanbankLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
