import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {AdminAsClientGuard} from '../../../guards/admin-as-client-guard.service';

@Component({
  selector: 'navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css'],
    providers: [AuthGuard, AdminAsClientGuard, AdminGuard]
})
export class NavbarClientComponent implements OnInit {
    showAdminData : boolean = false;

    //id_site: number = 0;
    //private sub: any;


    constructor(private authGuard: AuthGuard,
                private adminAsClientGuard: AdminAsClientGuard,
                private adminGuard: AdminGuard){}
                // private route: ActivatedRoute

    ngOnInit() {
        this.verifyUserRole();

        // this.sub = this.route.params.subscribe(params => {
        //     this.id_site = +params['id_site'];
            //console.log(this.id_site);
        //});
    }

    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }


    public verifyUserRole() {
        this.showAdminData = this.authGuard.canActivate()
                          && this.adminAsClientGuard.canActivate()
                          && this.adminGuard.canActivate();
    }

    public logoutFunction() {
        localStorage.clear();
    }

}
