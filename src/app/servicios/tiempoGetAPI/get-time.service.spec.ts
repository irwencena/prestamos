import { TestBed } from '@angular/core/testing';

import { GetTimeService } from './get-time.service';

describe('GetTimeService', () => {
  let service: GetTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
