import { TestBed } from '@angular/core/testing';

import { BetServiceService } from './bet-service.service';

describe('BetServiceService', () => {
  let service: BetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
