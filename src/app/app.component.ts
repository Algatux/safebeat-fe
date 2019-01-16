import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSidebarVisible: boolean = false;

  private isUserAuthenticated: boolean = false;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.isSidebarVisible = this.authentication.isUserAuthenticated();

    const authSubscription = this.authentication
      .observeAuthentication()
      .subscribe(expired => {
        this.isUserAuthenticated = this.isSidebarVisible = expired;
      });

    if (!this.isUserAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

}
