import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {DataService} from '../../../services/DataService.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {MachineClass} from '../../../models/const/machine-class';
import {MachinesGlossary} from '../../../models/const/machine-categorie';
import {NgForm} from '@angular/forms';
import {ClientService} from "../../../services/client/client.service";
declare var $: any;

@Component({
  selector: 'site-parc-page',
  templateUrl: './site-parc-page.component.html',
  styleUrls: ['./site-parc-page.component.css'],
    providers: [SiteService, ClientService, TableSortService, DataService, PaginationService, MachinesGlossary]
})
export class SiteParcPageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loadingGroupes = false;
    creating = false;
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
    choosen_engine_10_back = false;
    choosen_engine_back = false;
    choosen_engine = false;
    choosen_vehicule_back = false;
    choosen_engineWithEquipement = false;
    choosenCategory_id = 0;
    choosenMachine_caption = '';
    subcategoryEquipement: number;
    equipementChecked = 1;
    equipment_nullData = false;
    groupes_nullData = false;

    t3 = false;
    t4_t5 = false;
    t6_t8_t9_t11 = false;
    t7 = false;
    t10 = false;
    t12_41 = false;
    t12_rest = false;

    pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    saveButtonCaption = 'Ajouter';

    machines = [];
    machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1);
    employeeGroupes_view = [];
    employeeGroupes = [];
    checkedGroups = [];
    public remoteControls = [
        { value: true,  id: 'control1', display: 'oui' },
        { value: false, id: 'control2', display: 'non' }
    ];
    checkedRemoteControl = false;
  // category: number;
  // mark: string;
  // model: string;
  // registration: string;
  // techControl: string;
  // employeeGroups: Array<number>;
  // remoteControl: boolean;
  // parkNumber: string;
  // vgp: string;
  // equipment: number;


  sortingTarget = '';
    headers: any[] = [
          { display: 'Immatriculation', variable: 'name',         filter: 'text' },
          { display: 'N° de parc',      variable: 'parkNumber',   filter: 'text' },
          { display: 'Type',            variable: 'category',     filter: 'text' },
          { display: 'Modèle',          variable: 'model',        filter: 'text' },
          { display: 'Marque',          variable: 'mark',         filter: 'text' }
      ];


    constructor(private siteService: SiteService,
                public clientService: ClientService,
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
          console.log(result);
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
          this.getEmployeeGroupes();
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

  public addSubcategory(e: any) {
    const userInput = e.target;
    if (userInput.checked) {
      this.machine.employeeGroups.push(+userInput.name);
      this.machine.employeeGroups = this.machine.employeeGroups.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      });
    }
    if (!userInput.checked) {
      this.machine.employeeGroups = this.machine.employeeGroups.filter(val => val !== +userInput.name);
    }


  }

  get _checkedGroups() { // right now: ['1','3']
    return this.checkedGroups
      .map(opt => opt.id);
  }

  public getEmployeeGroupes() {
    this.loadingGroupes = true;
    this.clientService.getGroupList()
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loadingGroupes = false;
          this.employeeGroupes = result;
        }
      }, (err) => {
        this.loadingGroupes = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
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
    //       this.checkForEmptyEmployeeGroup();
    //
    //       console.log(this.machine);
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

  // category: number;
  // mark: string;
  // model: string;
  // registration: string;
  // techControl: string;
  // employeeGroups: Array<number>;
  // remoteControl: boolean;
  // parkNumber: string;
  // vgp: string;
  // equipment: number;

  public submitForm() {
    this.cancellMessages();
    if (this.machine.employeeGroups.length === 0  &&  this.choosenCategory_id === 3) {
      this.groupes_nullData = true;
      this.errorCreating = "SAFETY:  Au moins 1 groupe de salariés doit être choisi.";
      return false;
    } else {
      this.equipment_nullData = false;
    }
    // equipment_nullData = false;
    // groupes_nullData = false;

    // if (this.categoryDrivingLicense_active === 12) {
    //   if (this.drivingLicense.equipment === 0) {
    //     this.equipment_nullData = true;
    //     this.errorCreatingDrLicence = 'SAFETY:  At least 1 equipement have to be choosen.';
    //     console.log(this.drivingLicense.equipment);
    //     console.log(this.subcategoryEquipement);
    //     return false;
    //   }
    // }

    this.machine.category = this.choosenCategory_id;
    this.creating = true;
    console.log(this.machine);

    this.siteService.createMachine(this.machine, this.id_site)
      .subscribe(result => {
        if (result) {
          this.creating = false;
          console.log(result);
          this.successCreating = "Well done! You've created new machine.";
        }
      }, (err) => {
        this.creating = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
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


  public checkForEmptyEmployeeGroup() {
    if (this.machine.employeeGroups.length === 0) {
      this.groupes_nullData = true;
    } else {
      this.groupes_nullData = false;
    }
  }

  public cancellMessages() {
    this.loading = false;
    this.creating = false;
    this.loadingGroupes = false;
    this.successCreating = '';
    this.errorLoad = '';
    this.errorCreating = '';
  }

  public setEmptyType() {
    this.cancellMessages();
    this.t3 = false;
    this.t4_t5 = false;
    this.t7 = false;
    this.t10 = false;
    this.t12_41 = false;
    this.t12_rest = false;
    this.t6_t8_t9_t11 = false;
    this.choosen_vehicule_back = false;
    this.choosen_engine_back = false;
    this.choosen_engine_10_back = false;
    this.groupes_nullData = false;
  }

  public setEmptyMachines() {
    this.cancellMessages();
    this.machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1);
    this.machines = [];
    this.checkedGroups = [];
    const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkedI.length; i++) {
      (<HTMLInputElement>checkedI[i]).checked = false;
    }
    return;
  }

  public addType(e: any, caption: string) {
    const choosenType = e.target.id;
    if (+choosenType === 3) {
      console.log('333333333');
          this.setEmptyType();
          this.t3 = true;
          this.choosen_vehicule_back = true;
          this.choosenCategory_id = +choosenType;      /////
          this.checkForEmptyEmployeeGroup();
    } else if (+choosenType === 4 ||
               +choosenType === 5) {
          this.setEmptyType();
          this.t4_t5 = true;
          this.choosen_vehicule_back = true;
          this.choosenCategory_id = +choosenType;      /////
    } else if (+choosenType === 7) {
          this.setEmptyType();
          this.t7 = true;
          this.choosen_engine_back = true;
    } else if (+choosenType === 10) {
          this.setEmptyType();
          this.t10 = true;
          this.choosen_engine_10_back = true;
          this.choosenMachine_caption = '';
    } else if (+choosenType === 12) {
          this.setEmptyType();
          this.t12_rest = true;
          this.choosen_engine_10_back = true;
    } else {
          this.setEmptyType();
          this.t6_t8_t9_t11 = true;
          this.choosen_engine_back = true;
    }
    this.choosenType_id = choosenType;
    console.log(this.choosenType_id);
    this.setEmptyMachines();
    this.choosenType_caption = caption;
    this.employeeGroupes_view = this.employeeGroupes;
    // if (choosenType.checked) {
    //   this.drivingLicense.categories.push(+choosenType.name);
    //   this.drivingLicense.categories = this.drivingLicense.categories.filter((elem, index, self) => {
    //     return index === self.indexOf(elem);
    //   });
    // }
    // if (!choosenType.checked) {
    //   this.drivingLicense.categories = this.drivingLicense.categories.filter(val => val !== +choosenType.name);
    // }
    //
    // if (this.drivingLicense.categories.length === 0) {
    //   this.equipment_nullData = true;
    // } else {
    //   this.equipment_nullData = false;
    // }
  }

  public addCategory(e: any, caption: string) {
    const choosenCategory = e.target.id;
    if (+choosenCategory === 41) {
          this.setEmptyType();
          this.t12_41 = true;
          this.choosen_engine_back = true;
    }
    this.setEmptyMachines();
    this.choosenCategory_id = choosenCategory;
    console.log(this.choosenCategory_id);
    this.choosenMachine_caption = caption;
  }

  public addEquipement(e: any, equipementChecked: any, equipement_id: any) {
    console.log(typeof equipementChecked + ' equipementChecked,  equipement_id ' + typeof equipement_id);
    this.subcategoryEquipement = +e.target.id;
    console.log(this.subcategoryEquipement);
    this.machine.equipment = this.subcategoryEquipement;
    this.equipment_nullData = false;
  }



  datepickerRun() {
       $(() => {
            this.dataService.datepickerFranceFormat();
          //  $.datepicker.run();
           // $( '#ui-datepicker-div' ).datepicker();
            $( '#ui-datepicker-div, #datepicker1' ).datepicker();
            $( '#ui-datepicker-div, #datepicker1' ).datepicker( 'option', 'changeYear', true );

            $( '#format' ).change(function() {
                $( '#ui-datepicker-div, #datepicker1' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

}
