import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBoxComponent } from './login-box.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatCardModule
} from '@angular/material';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { LoggerService } from 'src/app/Services/logger.service';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockRouter {

  public navigate(): any {
    return false;
  }
}
class MockAuthService {}

describe('LoginBoxComponent', () => {
  let component: LoginBoxComponent;
  let fixture: ComponentFixture<LoginBoxComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginBoxComponent ],
      providers: [
        AuthenticationService,
        LoggerService,
        {provide: Router, useClass: MockRouter},
        {provide: AuthService, useClass: MockAuthService}],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatCardModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    // authService = TestBed.get(AuthenticationService);
    // spyOn(AuthenticationService, "isUserAuthenticated").and.returnValue(false);
    fixture = TestBed.createComponent(LoginBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
