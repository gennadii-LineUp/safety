import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';

@Component({
  selector: 'navbar-site',
  templateUrl: './navbar-site.component.html',
  styleUrls: ['./navbar-site.component.css'],
    providers: [AuthGuard, AdminGuard, ClientGuard]
})
export class NavbarSiteComponent implements OnInit {
    showAdminData : boolean = false;
    showClientData : boolean = false;
    showLogin : boolean = false;

    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private clientGuard: ClientGuard){}

    ngOnInit() {
        this.verifyUserRole();
    }

    public verifyUserRole() {
        this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
        this.showClientData = this.authGuard.canActivate() && this.clientGuard.canActivate();
        if (this.showAdminData || this.showClientData) {
            this.showLogin = false;
            return;
        }
        else {
            this.showLogin = true;
        }
    }


}
