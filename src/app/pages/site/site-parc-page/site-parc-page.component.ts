import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {DataService} from '../../../services/DataService.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {MachineClass} from "../../../models/const/machine-class";
import {MachinesGlossary} from "../../../models/const/machine-categorie";
declare var $: any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css'],
    providers: [SiteService, TableSortService, DataService, PaginationService, MachinesGlossary]
})
export class SiteParcPageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    id_site =  0;
    id_machine = 0;
    choosenType_id = 0;
    choosenType_caption = '';
    choosenType_10 = false;
    machineWithEquipement = false;
    choosenMachine_id = 0;
    choosenMachine_caption = '';
    subcategoryEquipement: number;
    equipementChecked = 1;

    pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    saveButtonCaption = 'Ajouter';

    machines = [];
    machine = new MachineClass(0, '', '', '', '', 0);

  sortingTarget = '';
    headers: any[] = [
          { display: 'Immatriculation', variable: 'name',         filter: 'text' },
          { display: 'N° de parc',      variable: 'parkNumber',   filter: 'text' },
          { display: 'Type',            variable: 'category',     filter: 'text' },
          { display: 'Modèle',          variable: 'model',        filter: 'text' },
          { display: 'Marque',          variable: 'mark',         filter: 'text' }
      ];


    constructor(private siteService: SiteService,
                private tableSortService: TableSortService,
                private dataService: DataService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private paginationService: PaginationService,
                private machinesGlossary: MachinesGlossary) {}


  ngOnInit() {
        this.id_site = localStorage.id_site;
        this.findByNameFunction('', 1, '');
        this.siteService.tableMobileViewInit();

        // $(document).ready(() => {
        //     this.datepickerRun();
        // });
  }
  ngOnDestroy() {
    localStorage.removeItem('search_name');
    localStorage.removeItem('search_page');
  }


  public getSortingTarget() {
    this.sortingTarget = this.tableSortService._getSortingTarget();
  }


  public findByNameFunction(name: string, page: any = 1, sort: string) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.search_name;
    }
    this.activePage = page;

    this.siteService.findMachineByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          console.log('------------');
          this.loading = false;
          this.machines = result.items;

          this.totalItems = +result.pagination.totalCount;
          if (this.totalItems === 0) {
            this.emptyTable = true;
          }
          console.log('ITEMS  ' + this.totalItems);
          this.currentPage = +result.pagination.current;

          this.setPage(this.currentPage);

          setTimeout(() => {
            this.siteService.tableMobileViewInit();
          }, 200);
          localStorage.setItem('search_name', _name);
          localStorage.setItem('search_page', this.currentPage);
        }
      }, (err) => {
        this.loading = false;
        this.emptyTable = true;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.totalItems, page);
  }


  public setEmptyMachines() {
    this.machine = new MachineClass(0, '', '', '', '', 0);
    this.machines = [];
    // const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    // for (let i = 0; i < checkedI.length; i++) {
    //   (<HTMLInputElement>checkedI[i]).checked = false;
    // }
    return;
  }


  public modifierFunction(id_itemForUpdate: number) {
    this.cancellMessages();
    // this.creating = true;
    this.setEmptyMachines();
    console.log(id_itemForUpdate);

    // let result = (this.original_fichiers.filter(obj => {
    //   return obj.id === id_itemForUpdate;
    // }))[0];

    // this.siteService.getOneFichier(this.id_site, id_itemForUpdate)
    //   .subscribe(result => {
    //     if (result) {
    //       // this.creating = false;
    //       console.log(result);
    //       this.machine.name = result.name;
    //       this.checkedGroups = result.employeeGroups;
    //       this.saveButtonCaption = 'Modifier';
    //       this.id_machine = result.id;
    //       //this.machine.employeeGroups = this._checkedGroups;
    //
    //       if (this.newFichier.employeeGroups.length > 0) {
    //         this.categoryNewFichier_nullData = false;
    //       }
    //
    //       console.log(this.newFichier);
    //       console.log(this.checkedGroups);
    //
    //       console.log(this._checkedGroups);
    //     }
    //   }, (err) => {
    //     this.creating = false;
    //     console.log(err);
    //     this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
    //   });
  }


  public deleteFunction(id_itemForDelete: number) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.siteService.deleteMachine(this.id_site, id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.findByNameFunction(this.searchName, this.activePage, '');
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public cancellMessages() {
    this.loading = false;
    this.successCreating = '';
    this.errorLoad = '';
    this.errorCreating = '';
  }


  public addType(e: any, caption: string) {
    const userInput = e.target;
    if (+userInput.id === 10) {
      this.choosenType_10 = true;
      this.choosenMachine_caption = '';
    } else {
      this.choosenType_10 = false;
    }
    if (+userInput.id === 12) {
      this.machineWithEquipement = true;
    } else {
      this.machineWithEquipement = false;
    }
    this.choosenType_id = userInput.id;
    console.log(this.choosenType_id);

    this.choosenType_caption = caption;

    // if (userInput.checked) {
    //   this.drivingLicense.categories.push(+userInput.name);
    //   this.drivingLicense.categories = this.drivingLicense.categories.filter((elem, index, self) => {
    //     return index === self.indexOf(elem);
    //   });
    // }
    // if (!userInput.checked) {
    //   this.drivingLicense.categories = this.drivingLicense.categories.filter(val => val !== +userInput.name);
    // }
    //
    // if (this.drivingLicense.categories.length === 0) {
    //   this.categoryDrivingLicense_nullData = true;
    // } else {
    //   this.categoryDrivingLicense_nullData = false;
    // }
  }

  public addMachine(e: any, caption: string) {
    const userInput = e.target;
    this.choosenMachine_id = userInput.id;
    console.log(this.choosenMachine_id);
    this.choosenMachine_caption = caption;
  }
  public addSubcategoryEquipement(e: any) {
    this.subcategoryEquipement = +e.target.id;
    console.log(this.subcategoryEquipement);
    // this.drivingLicense.equipment = this.subcategoryEquipement;
    // this.categoryDrivingLicense_nullData = false;
  }



  datepickerRun() {
       $(() => {
            this.dataService.datepickerFranceFormat();
          //  $.datepicker.run();
           // $( '#ui-datepicker-div' ).datepicker();
            $( '#ui-datepicker-div, #datepicker1, #datepicker2, #datepicker3' ).datepicker();
            $( '#ui-datepicker-div, #datepicker1, #datepicker2, #datepicker3' ).datepicker( 'option', 'changeYear', true );

            $( '#format' ).change(function() {
                $( '#ui-datepicker-div, #datepicker1, #datepicker2, #datepicker3' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

}
