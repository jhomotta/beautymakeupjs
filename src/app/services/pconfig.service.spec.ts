import { TestBed } from '@angular/core/testing';

import { PconfigService } from './pconfig.service';

describe('PconfigService', () => {
  let service: PconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
