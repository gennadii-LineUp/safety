import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';
import {ActivatedRoute} from '@angular/router';
import {AdminAsClientGuard} from '../../../guards/admin-as-client-guard.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {EmployeeGeneralGuard} from '../../../guards/employee-general-guard.service';
import {EmployeeTechGuard} from '../../../guards/employee-technical-guard.service';

@Component({
  selector: 'navbar-site',
  templateUrl: './navbar-site.component.html',
  styleUrls: ['./navbar-site.component.css']
})
export class NavbarSiteComponent implements OnInit, OnDestroy {
    showAdminData = false;
    showClientData = false;
    showLogin = false;
    showEmployee_Admin = false;
    showEmployee_parcMachine = false;
    showEmployee_general = false;

  id_site = 0;
    private sub: any;


    constructor(private authGuard: AuthGuard,
                private adminGuard: AdminGuard,
                private adminAsClientGuard: AdminAsClientGuard,
                private clientGuard: ClientGuard,
                private employeeAdminGuard: EmployeeAdminGuard,
                private employeeGeneralGuard: EmployeeGeneralGuard,
                private employeeTechGuard: EmployeeTechGuard,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.verifyUserRole();

        this.sub = this.route.params.subscribe(params => {
            this.id_site = +params['id_site'];
            console.log('id_site.subscribe = ' + this.id_site);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    public verifyUserRole() {
        this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate() && this.adminAsClientGuard.canActivate();
        this.showClientData = this.authGuard.canActivate() && this.clientGuard.canActivate();
        this.showEmployee_Admin = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
      this.showEmployee_parcMachine = this.authGuard.canActivate() && this.employeeTechGuard.canActivate();
      this.showEmployee_general = this.authGuard.canActivate() && this.employeeGeneralGuard.canActivate();

      // if (this.showAdminData || this.showClientData) {
        //     this.showLogin = false;
        //     return;
        // }
        // else {
        //     this.showLogin = true;
        // }
    }

  public logoutFunction() {
    localStorage.clear();
  }


}
