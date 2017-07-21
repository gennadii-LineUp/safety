import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {AdminService} from "../../../services/admin/admin.service";

@Component({
  selector: 'navbar-salaries',
  templateUrl: './navbar-salaries.component.html',
  styleUrls: ['./navbar-salaries.component.css'],
    providers: [AuthGuard, EmployeeAdminGuard, AdminService]
})
export class NavbarSalariesComponent implements OnInit {
  myCompteFormation = '';

    showEmployeeAdminData = false;

    constructor(private authGuard: AuthGuard,
                private employeeAdminGuard: EmployeeAdminGuard,
                private adminService: AdminService) {}

    ngOnInit() {
        this.verifyUserRole();
        this.getExistingCompteFormation();
    }

    public verifyUserRole() {
        this.showEmployeeAdminData = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
    }

    logoutFunction() {
          localStorage.clear();
      }

  public getExistingCompteFormation() {
    this.adminService.getExistingReglages()
      .subscribe(result => {
        if (result) {
          console.log(888888888888888);
          console.log(result);
          this.myCompteFormation = result.monCompteFormationLink;
        }
      }, (err) => {
        console.log(err);
      });
  }

  openLinkInNewWindowFunction() {
    window.open(this.myCompteFormation, '_blank');
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
