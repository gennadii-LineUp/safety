import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';
import {ActivatedRoute} from '@angular/router';
import {AdminAsClientGuard} from '../../../guards/admin-as-client-guard.service';

@Component({
  selector: 'navbar-site',
  templateUrl: './navbar-site.component.html',
  styleUrls: ['./navbar-site.component.css']
})
export class NavbarSiteComponent implements OnInit {
    showAdminData : boolean = false;
    showClientData : boolean = false;
    showLogin : boolean = false;

    id_site: number = 0;
    private sub: any;


    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private adminAsClientGuard: AdminAsClientGuard,
                private clientGuard: ClientGuard,
                private route: ActivatedRoute){}

    ngOnInit() {
        this.verifyUserRole();

        this.sub = this.route.params.subscribe(params => {
            this.id_site = +params['id_site'];

            //console.log(this.id_site);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    public verifyUserRole() {
        this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate() && this.adminAsClientGuard.canActivate();
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
