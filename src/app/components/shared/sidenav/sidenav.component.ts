import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Logger} from '../../../services/logger.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authentication: AuthenticationService) { }

  ngOnInit() {}

  logout() {
    Logger.write('Clicked logout');
    this.authentication.logout();
  }

}
