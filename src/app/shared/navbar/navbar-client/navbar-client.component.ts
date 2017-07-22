import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
// import {AdminGuard} from '../../../guards/admin-guard.service';
import {AdminAsClientGuard} from '../../../guards/admin-as-client-guard.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';

@Component({
  selector: 'navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css'],
  providers: [AdminAsClientGuard, EmployeeAdminGuard, AuthGuard]
})
export class NavbarClientComponent implements OnInit {
    showAdminData = false;
    showEmployee_Admin = false;
    // id_site: number = 0;
    // private sub: any;


    constructor(private adminAsClientGuard: AdminAsClientGuard,
                private employeeAdminGuard: EmployeeAdminGuard,
                private authGuard: AuthGuard) {}
                // private route: ActivatedRoute
                //
                // private adminGuard: AdminGuard
    ngOnInit() {
        this.verifyUserRole();

        // this.sub = this.route.params.subscribe(params => {
        //     this.id_site = +params['id_site'];
            // console.log(this.id_site);
        // });
    }

    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }


    public verifyUserRole() {
        this.showAdminData = this.adminAsClientGuard.canActivate();
        this.showEmployee_Admin = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
    }



public logoutFunction() {
        localStorage.clear();
    }

}
