import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { AuthService } from 'angularx-social-login';

class AuthServiceMock {}

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: AuthService, useClass: AuthServiceMock}]
  }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('is authenticated must return false', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service.isUserAuthenticated()).toBeFalsy();
  });
});
