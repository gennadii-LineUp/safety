import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';
import {EmployeeAdminGuard} from '../../../guards/employee-admin-guard.service';
import {AdminService} from '../../../services/admin/admin.service';
import {EmployeeGeneralGuard} from '../../../guards/employee-general-guard.service';
import {EmployeeTechGuard} from '../../../guards/employee-technical-guard.service';

@Component({
  selector: 'navbar-salaries',
  templateUrl: './navbar-salaries.component.html',
  styleUrls: ['./navbar-salaries.component.css'],
    providers: [AuthGuard, EmployeeAdminGuard, AdminService]
})
export class NavbarSalariesComponent implements OnInit {
  myCompteFormation = '';
  id_site = 0;

    showEmployee_Admin = false;
    showEmployee_parcMachine = false;
    showEmployee_general = false;
    menu_admin: any[] = [
      { id: 1,  display: 'Sites',               router: '/client' },
      { id: 2,  display: 'Groupes de salariés', router: '/client/groupes' },
      { id: 3,  display: 'Salariés',            router: '/client/employees' },
      // { id: 4,  display: 'Profil',              router: '/client/profil' },
      { id: 5,  display: 'Bibliothèque',        router: '/client/bibliotheque' },
    ];
    menu_employee_general: any[] = [
    { id: 1,  display: 'Accueil',  router1: '["/site", ', router2: ', "reglages"]' },
    { id: 2,  display: 'Réglages', router1: '["/site", ', router2: ', "reglages"]' },
    { id: 3,  display: 'Fichiers', router1: '["/site", ', router2: ', "fichiers"]' },
    { id: 4,  display: 'Parc Machines', router1: '["/site", ', router2: ', "parc"]' },
    { id: 5,  display: 'Salariés', router1: '["/site", ', router2: ', "salaries"]' }
  ];

    constructor(public authGuard: AuthGuard,
                public employeeAdminGuard: EmployeeAdminGuard,
                public employeeGeneralGuard: EmployeeGeneralGuard,
                public employeeTechGuard: EmployeeTechGuard,
                public adminService: AdminService) {}

    ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('navbar salaryee  id_site ' + this.id_site);
        this.verifyUserRole();
        this.getExistingCompteFormation();
      // localStorage.setItem('id_site', ''+this.id_site);
    }

    public verifyUserRole() {
        this.showEmployee_Admin = this.authGuard.canActivate() && this.employeeAdminGuard.canActivate();
        console.log('showEmployee_Admin ' + this.showEmployee_Admin);
        this.showEmployee_parcMachine = this.authGuard.canActivate() && this.employeeTechGuard.canActivate();
        this.showEmployee_general = this.authGuard.canActivate() && this.employeeGeneralGuard.canActivate();
    }

    logoutFunction() {
          localStorage.clear();
      }

  public getExistingCompteFormation() {
    this.adminService.getMonCompteFormation()
      .subscribe(result => {
          this.myCompteFormation = result.monCompteFormationLink;
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
  // constructor(public authGuard: AuthGuard,
  //             public adminGuard: AdminGuard,
  //             public clientGuard: ClientGuard){}
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
