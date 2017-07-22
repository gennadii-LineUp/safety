import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {AdminService} from '../../../services/admin/admin.service';

@Component({
  selector: 'navbar-salaries',
  templateUrl: './navbar-salaries.component.html',
  styleUrls: ['./navbar-salaries.component.css'],
    providers: [AuthGuard, EmployeeAdminGuard, AdminService]
})
export class NavbarSalariesComponent implements OnInit {
  myCompteFormation = '';

    showEmployee_Admin = false;
    showEmployee_responsable_parcMachine = false;
    menu_admin: any[] = [
      { id: 1,  display: 'Sites',               router: '/client' },
      { id: 2,  display: 'Groupes de salariés', router: '/client/groupes' },
      { id: 3,  display: 'Salariés',            router: '/client/employees' },
      // { id: 4,  display: 'Profil',              router: '/client/profil' },
      { id: 5,  display: 'Bibliothèque',        router: '/client/bibliotheque' },
    ];

    constructor(private authGuard: AuthGuard,
                private employeeAdminGuard: EmployeeAdminGuard,
                private adminService: AdminService) {}

    ngOnInit() {
        this.verifyUserRole();
        this.getExistingCompteFormation();
    }

    public verifyUserRole() {
        this.showEmployee_Admin = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
        console.log('showEmployee_Admin ' + this.showEmployee_Admin);
        // showEmployee_responsable_parcMachine
    }

    logoutFunction() {
          localStorage.clear();
      }

  public getExistingCompteFormation() {
    this.adminService.getMonCompteFormation()
      .subscribe(result => {
        if (result) {
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
