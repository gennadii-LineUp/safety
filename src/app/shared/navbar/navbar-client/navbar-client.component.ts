import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {AdminAsClientGuard} from '../../../guards/admin-as-client-guard.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';

@Component({
  selector: 'navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.css']
})
export class NavbarClientComponent implements OnInit {
    showAdminData = false;
    showEmployee_Admin = false;


    constructor(public adminAsClientGuard: AdminAsClientGuard,
                public employeeAdminGuard: EmployeeAdminGuard,
                public authGuard: AuthGuard) {}
    ngOnInit() {
        this.verifyUserRole();
    }

    public verifyUserRole() {
        this.showAdminData = this.adminAsClientGuard.canActivate();
        this.showEmployee_Admin = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
    }


public logoutFunction() {
        localStorage.clear();
    }

}
