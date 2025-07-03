import { TestBed } from '@angular/core/testing';

import { StateClientService } from './state-client.service';

describe('StateUserService', () => {
  let service: StateClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
