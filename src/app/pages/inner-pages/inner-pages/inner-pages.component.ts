import { Component, OnInit } from '@angular/core';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';

@Component({
  selector: 'app-inner-pages',
  templateUrl: './inner-pages.component.html',
  styleUrls: ['./inner-pages.component.css'],
    providers: [
        AdminGuard, ClientGuard
    ]
})
export class InnerPagesComponent implements OnInit {

    loggedInAsAdmin = false;
    loggedInAsClient = false;

    constructor(private adminGuard: AdminGuard,
              private clientGuard: ClientGuard ) { }

  ngOnInit() {
        this.checkLoggedInUser();
  }

  public checkLoggedInUser() {
        if (this.adminGuard.canActivate()) {
            this.loggedInAsClient = false;
            this.loggedInAsAdmin = true;
        }
      if (this.clientGuard.canActivate()) {
          this.loggedInAsAdmin = false;
          this.loggedInAsClient = true;
      }
  }


}
