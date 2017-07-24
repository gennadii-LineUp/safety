import { Component, OnInit } from '@angular/core';
import {TableSortService} from '../../../../services/table-sort.service';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {EmployeesSettingAccessClass} from '../../../../models/const/employee-setting-access-class';

@Component({
  selector: 'responsable-site',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css'],
    providers: [ SiteService, TableSortService]
})
export class ResponsableSiteComponent implements OnInit {
    emptyTableMobile = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    id_site: number;

    employee_fromSearch = [];
    employee_forAccess = [];
    types_employeeAccess = [
      { id: 1,  description: 'acces general, access to the employees and park of the machines of the site' },
      { id: 0,  description: 'acces technical, access to machinery park of a site' }
    ];

    headers: any[] = [
        { display: 'Nom du salarié', variable: 'name',    filter: 'text' },
        { display: 'Accès',          variable: 'access',  filter: 'text' },
    ];
    mobileHeaders: any[] = [
          { display: 'Nom',       variable: 'name',    filter: 'text' },
          { display: 'n° Sécu',   variable: 'nsecu',  filter: 'text' },
      ];


    constructor(private siteService: SiteService,
                private tableSortService: TableSortService,
                private errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
      this.id_site = localStorage.id_site;
      this.siteService.tableMobileViewInit();
  }

  public findEmployeeByName_searchFunction(name: string, page: any = 1, sort: string) {
    this.setEmptyData();
    this.loading = true;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.siteEmployeeSearch_name;
    }
    this.siteService.findEmployeeByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.employee_fromSearch = result.items;
          this.loaded = true;
          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 100);
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public takeEmployee_forSettingAccessFunction(employee) {
      console.log(employee);
      this.emptyTableMobile = false;
      const employee_forSettingAccess = new EmployeesSettingAccessClass(employee.id, employee.name, employee.surname, employee.numSecu, 0);

      this.employee_forAccess.push(employee_forSettingAccess);
      for (let i = 0; i < this.employee_fromSearch.length; i++) {
          if (+this.employee_fromSearch[i].id === +employee.id) {
            this.employee_fromSearch.splice(i, 1);
            break;
          }
      }
  }

  public submitForm() {
      console.log(this.employee_forAccess);
      this.cancellMessages();
      this.loading = true;

      // const visites = new VisitesClass(_datepicker_medicalVisit, _datepicker_caces);
      // console.log(visites);
      this.siteService.addEmployeeAccess(this.employee_forAccess, this.id_site)
        .subscribe(result => {
          if (result) {
            this.loading = false;
            console.log(result);
           // this.successUpdate = 'Bravo! Vos modifications sont enregistrées.';
            setTimeout(() => {
              this.siteService.tableMobileViewInit();
            }, 100);
          }
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
        });


   }

  public setEmptyData() {
    this.loaded = false;
    this.cancellMessages();
    this.employee_fromSearch = [];
    this.employee_forAccess = [];
    return true;
  }
  private cancellMessages() {
    this.loading = false;
    this.errorLoad = '';
    this.errorCreating = '';
  }

}
