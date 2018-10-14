import { TestBed } from '@angular/core/testing';

import { AuthEventsService } from './auth-events.service';

describe('AuthEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthEventsService = TestBed.get(AuthEventsService);
    expect(service).toBeTruthy();
  });
});
