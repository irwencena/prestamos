import { TestBed } from '@angular/core/testing';

import { DocaddService } from './docadd.service';

describe('DocaddService', () => {
  let service: DocaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
