import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';

@Component({
  selector: 'navbar-salaries',
  templateUrl: './navbar-salaries.component.html',
  styleUrls: ['./navbar-salaries.component.css'],
    providers: [AuthGuard, EmployeeAdminGuard]
})
export class NavbarSalariesComponent implements OnInit {

    showEmployeeAdminData = false;

    constructor(private authGuard: AuthGuard,
                private employeeAdminGuard: EmployeeAdminGuard) {}

    ngOnInit() {
        this.verifyUserRole();
    }

    public verifyUserRole() {
        this.showEmployeeAdminData = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
    }

    logoutFunction() {
          localStorage.clear();
      }


///  OLD Data
  // showAdminData : boolean = false;
  // showClientData : boolean = false;
  // showLogin : boolean = false;
  //
  // constructor(private authGuard: AuthGuard,
  //             private adminGuard: AdminGuard,
  //             private clientGuard: ClientGuard){}
  //
  // public verifyUserRole() {
  //   this.showAdminData = this.authGuard.canActivate() && this.adminGuard.canActivate();
  //   this.showClientData = this.authGuard.canActivate() && this.clientGuard.canActivate();
  //   if (this.showAdminData || this.showClientData) {
  //     this.showLogin = false;
  //     return;
  //   }
  //   else {
  //     this.showLogin = true;
  //   }
  // }

}
