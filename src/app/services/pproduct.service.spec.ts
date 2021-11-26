import { TestBed } from '@angular/core/testing';

import { PproductService } from './pproduct.service';

describe('PproductService', () => {
  let service: PproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
