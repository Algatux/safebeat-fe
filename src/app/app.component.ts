import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';
import { Router } from '@angular/router';
import { ConfigurationService } from './Configuration/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSidebarVisible: boolean = false;

  private isUserAuthenticated: boolean = false;

  constructor(
    private config: ConfigurationService,
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authentication.isUserAuthenticated();
    this.isSidebarVisible = this.isUserAuthenticated;

    if (!this.isUserAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

}
