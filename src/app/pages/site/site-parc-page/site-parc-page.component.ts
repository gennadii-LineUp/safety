import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {DataService} from '../../../services/DataService.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {MachineClass} from '../../../models/const/machine-class';
import {MachinesGlossary} from '../../../models/const/machine-categorie';
import {ClientService} from '../../../services/client/client.service';
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
    successModify = '';

    id_site =  0;
    id_machine = 0;
    itemForChange = 0;
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

    loadingFile = false;
    loadingFileSignature = false;
    loadingFileVGP = false;
    loadingFileCT = false;
    loadingFileOther = false;
    uploadedFile = false;
    contentVGP: any;
    contentCT: any;
  contentOther: any;
    fileListVGP: FileList;
    fileListCT: FileList;
  fileListOther: FileList;
    userHasChoosenFileVGP = false;
    userHasChoosenFileCT = false;
  userHasChoosenFileOther = false;
    uploadVGPFileText: any;
    uploadCTFileText: any;
  uploadOtherFileText: any;

  @ViewChild('vgpInput')
  vgpInput: any;

  @ViewChild('ctInput')
  ctInput: any;

  @ViewChild('otherInput')
  otherInput: any;

  pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    saveButtonCaption = 'Enregistrer';

    machines = [];
    machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1, false, false, [], 0);
    employeeGroupes_view = [];
    employeeGroupes = [];
    checkedGroups = [];
    public remoteControls = [
        { value: true,  id: 'control1', display: 'oui' },
        { value: false, id: 'control2', display: 'non' }
    ];
    checkedRemoteControl = false;

    sortingTarget = '';
    sorting: any = { column: 'type',  descending: false };
    headers: any[] = [
          { display: 'Immatriculation', variable: 'registration', filter: 'text' },
          { display: 'N° de parc',      variable: 'parkNumber',   filter: 'text' },
          { display: 'Type',            variable: 'type',         filter: 'text' },
          { display: 'Modèle',          variable: 'model',        filter: 'text' },
          { display: 'Marque',          variable: 'mark',         filter: 'text' }
      ];

    constructor(public siteService: SiteService,
                public clientService: ClientService,
                public tableSortService: TableSortService,
                public dataService: DataService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public paginationService: PaginationService,
                public machinesGlossary: MachinesGlossary) {}

  ngOnInit() {
        this.id_site = localStorage.id_site;
        console.log('parc  id_site ' + this.id_site);
        this.findByNameFunction('', 1, '');
        this.getEmployeeGroupes();
        this.siteService.tableMobileViewInit();

        // $(document).ready(() => {
        //     this.datepickerRun();
        // });
  }
  ngOnDestroy() {
    localStorage.removeItem('search_name');
    localStorage.removeItem('search_page');
  }


  public selectedClass(columnName): string {
    return columnName === this.sorting.column ? 'sort-button-' + this.sorting.descending : 'double-sort-button';
  }
  public changeSorting(columnName: string, e: any): void {
    let sortingDirection: string;
    let thClass: string;

    const sort = this.sorting;
    if (sort.column === columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }

    if (e.target.firstElementChild) {
      thClass = e.target.firstElementChild.className;
    } else {
      thClass = e.target.className;
    }
    if ((thClass === 'double-sort-button') || (thClass === 'sort-button-true')) {
      sortingDirection = '';  // down
    }
    if (thClass === 'sort-button-false') {
      sortingDirection = '-'; // up
    }

    // let input_findClientByName = window.document.getElementsByClassName('search-input')['0'].value;
    this.sortingTarget = '&sort=' + sortingDirection + columnName;
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
    this.searchName = _name;

    this.siteService.findMachineByName(_name, page, this.id_site, sort)
      .subscribe(result => {
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
    this.checkForEmptyEmployeeGroup();
    console.log(this.machine.employeeGroups);
  }

  get _checkedGroups() { // right now: ['1','3']
    return this.checkedGroups
      .map(opt => opt.id);
  }

  public getEmployeeGroupes() {
    this.loadingGroupes = true;
    this.clientService.getGroupList()
      .subscribe(result => {
          console.log(result);
          this.loadingGroupes = false;
          this.employeeGroupes = result;
      }, (err) => {
        this.loadingGroupes = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public submitForm() {
    this.cancellMessages();
    this.creating = true;
    let urlOption = '';
    if (this.itemForChange) {
      urlOption = '/' + this.itemForChange;
      this.saveButtonCaption = 'Modifier';
    }

    if (this.choosenCategory_id === 3 && this.machine.employeeGroups.length === 0) {
      this.groupes_nullData = true;
      this.errorCreating = 'SAFETY:  Au moins 1 groupe de salariés doit être choisi.';
      return false;
    } else {
      this.equipment_nullData = false;
    }
    let datepicker_techControl = '';
    let datepicker_vgp = '';
    if (this.t3 || this.t4_t5 || this.t7 || this.t10 || this.t12_41) {
      datepicker_techControl = (<HTMLInputElement>window.document.querySelectorAll('#techControl')[0]).value;
      console.dir(datepicker_techControl);
    }
    if (this.t6_t8_t9_t11 || this.t7 || this.t10 || this.t12_41 || this.t12_rest) {
      datepicker_vgp = (<HTMLInputElement>window.document.querySelectorAll('#vgp')[0]).value;
      console.dir(datepicker_vgp);
    }

    this.machine.category = +this.choosenCategory_id;
    this.machine.techControl = datepicker_techControl;
    this.machine.vgp = datepicker_vgp;
    console.log(this.machine);
    let _datepicker_techControl = '';
    if (datepicker_techControl !== '') {
      _datepicker_techControl = this.dataService.convertDateFromInputeToServer(this.machine.techControl);
    }
    let _datepicker_vgp = '';
    if (datepicker_vgp !== '') {
      _datepicker_vgp = this.dataService.convertDateFromInputeToServer(this.machine.vgp);
    }

    const _machine = new MachineClass(+this.machine.category,
                                      this.machine.mark,
                                      this.machine.model,
                                      this.machine.registration,
                                      _datepicker_techControl,
                                      this.machine.employeeGroups,
                                      this.machine.remoteControl,
                                      this.machine.parkNumber,
                                      _datepicker_vgp,
                                      this.machine.equipment,
                                      false, false, [], 0);
    console.log(_machine);

    this.siteService.createMachine(_machine, this.id_site, urlOption)
      .subscribe(result => {
          console.log(result);
          this.id_machine = result.id;
          if (this.userHasChoosenFileVGP) {this.loadToServerVGPFunction(); }
          if (this.userHasChoosenFileCT) {
              setTimeout(() => {
                this.loadToServerCTFunction();
              }, 400);
          }
          if (this.userHasChoosenFileOther) {
            setTimeout(() => {
              this.loadToServerOtherFunction();
            }, 800);
          }

          if (this.itemForChange) {
            this.saveButtonCaption = 'Enregistrer';
            this.itemForChange = 0;
            this.successModify = 'Bravo! Vos modifications sont enregistrées.';
          } else {
              this.successCreating = 'Bien joué! Vous avez créé une nouvelle machine.';
          }
          this.creating = false;
          // modal close /////////
          const _modal = document.getElementById('modal_Machine__dataInput').firstElementChild;
          _modal.classList.add('hidden');
          const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
          (<HTMLScriptElement>modal_bg).classList.add('hidden');
          /////////
          this.findByNameFunction(this.searchName, this.activePage, '');
          this.setEmptyMachines();
      }, (err) => {
        this.creating = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public modalOpen() {
    const _modal = document.getElementById('modal_Machine__dataInput').firstElementChild;
    if (_modal) {_modal.classList.remove('hidden'); }
    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
    if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
  }


  public deleteFunction(id_itemForDelete: number) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.siteService.deleteMachine(this.id_site, id_itemForDelete)
      .subscribe(result => {
          this.loading = false;
          console.log(result);
          this.findByNameFunction(this.searchName, this.activePage, '');
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
    this.successModify = '';
    this.errorLoad = '';
    this.errorCreating = '';
  }

  public setEmptyCategory() {
    this.itemForChange = 0;
    this.machine.category = 0;
    this.choosenCategory_id = 0;
    this.saveButtonCaption = 'Enregistrer';
    this.uploadVGPFileText = '';
    this.uploadCTFileText = '';
    this.uploadOtherFileText = '';

  }

  public modifierFunction(id_itemForUpdate: number) {
    this.cancellMessages();
    this.setEmptyMachines();
    this.modalOpen();
    console.log(id_itemForUpdate);
    this.creating = true;
    this.siteService.getOneMachine(this.id_site, id_itemForUpdate)
      .subscribe(result => {
          console.log(result);
          this.itemForChange = result.id;
          this._addType(result.parentCategoryId, '');
          this.machine.category = result.categoryId;
          this.choosenCategory_id = result.categoryId;
          this.choosenType_caption = result.parentCategoryName;
          this.choosenMachine_caption = result.categoryName;
          this.machine.mark = result.mark;
          this.machine.model = result.model;

          if (result.registration) { this.machine.registration = result.registration; }
          if (result.employeeGroups) {
              if (result.employeeGroups.length !== 0) {
                this.machine.employeeGroups = result.employeeGroups;
                this.checkedGroups = result.employeeGroups;
                this.checkForEmptyEmployeeGroup();
              }
          }

          if (result.equipment) { this.machine.equipment = result.equipment; }
          if (result.parkNumber) { this.machine.parkNumber = result.parkNumber; }
          if (result.remoteControl) {
              this.machine.remoteControl = result.remoteControl;
              this.checkedRemoteControl = result.remoteControl;
          }
          if (result.techControl) {
            this.machine.techControl = this.dataService.convertDateFromServerToInput(result.techControl);
          }
          if (result.vgp) {
            this.machine.vgp = this.dataService.convertDateFromServerToInput(result.vgp);
          }

          this.saveButtonCaption = 'Modifier';
          this.machine.employeeGroups = this._checkedGroups;
          this.creating = false;
      }, (err) => {
        this.creating = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
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
    this.machine = new MachineClass(0, '', '', '', '', [], false, '', '', 1, false, false, [], 0);
    this.checkedGroups = [];
    // this.itemForChange = 0;
    const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkedI.length; i++) {
      (<HTMLInputElement>checkedI[i]).checked = false;
    }
    this.uploadVGPFileText = '';
    this.uploadCTFileText = '';
    this.uploadOtherFileText = '';
    return;
  }

  public addType(e: any, caption: string) {
    const choosenType = e.target.id;
    this._addType(choosenType, caption);
  }
  public _addType(choosenType: number, caption: string) {
    // let result = (this.original_fichiers.filter(obj => {
    //   return obj.id === id_itemForUpdate;
    // }))[0];

    if (+choosenType === 3) {
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
      this.choosenCategory_id = +choosenType;
    } else if (+choosenType === 12) {
      this.setEmptyType();
      this.t12_rest = true;
      this.choosen_engine_10_back = true;
    } else {
      this.setEmptyType();
      this.t6_t8_t9_t11 = true;
      this.choosen_engine_back = true;
    }
    this.choosenType_id = +choosenType;
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

  public resetVGP() {
    this.userHasChoosenFileVGP = false;
    this.vgpInput.nativeElement.value = '';
    console.log(this.vgpInput.nativeElement.files);
    this.uploadVGPFileText = '';
  }
  public resetCT() {
    this.userHasChoosenFileCT = false;
    this.ctInput.nativeElement.value = '';
    // console.log(this.ctInput.nativeElement.files);
    this.uploadCTFileText = '';
  }
  public resetOther() {
    this.userHasChoosenFileOther = false;
    this.otherInput.nativeElement.value = '';
    // console.log(this.ctInput.nativeElement.files);
    this.uploadOtherFileText = '';
  }


  public fileChangeVGP(event) {
      console.log('======fileChange VGP======');
    this.fileListVGP = event.target.files;
    if (this.fileListVGP.length > 0) {
      this.userHasChoosenFileVGP = true;
      let fileVGP = this.fileListVGP[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentVGP = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.uploadVGPFileText = fileVGP.name;
      console.log(fileVGP);
    }
  }

  public loadToServerVGPFunction() {
    this.loadingFileVGP = true;
    this.siteService.loadToServerVGP(this.contentVGP, this.id_site, this.id_machine)
      .subscribe(result => {
        console.log(result);
        this.loadingFileVGP = false;
        this.userHasChoosenFileVGP = false;
        this.resetVGP();
      }, (err) => {
        this.loadingFileVGP = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public fileChangeCT(event) {
    console.log('======fileChange CT======');
    this.fileListCT = event.target.files;
    if (this.fileListCT.length > 0) {
      this.userHasChoosenFileCT = true;
      let fileCT = this.fileListCT[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentCT = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.uploadCTFileText = fileCT.name;
      console.log(fileCT);
     }
  }

  public loadToServerCTFunction() {
    this.loadingFileCT = true;
    this.siteService.loadToServerCT(this.contentCT, this.id_site, this.id_machine)
      .subscribe(result => {
        console.log(result);
        this.loadingFileCT = false;
        this.userHasChoosenFileCT = false;
        this.resetCT();
      }, (err) => {
        this.loadingFileCT = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public fileChangeOther(event) {
    console.log('======fileChange other======');
    this.fileListOther = event.target.files;
    if (this.fileListOther.length > 0) {
      this.userHasChoosenFileOther = true;
      let fileOther = this.fileListOther[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentOther = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.uploadOtherFileText = fileOther.name;
      console.log(fileOther);
    }
  }

  public loadToServerOtherFunction() {
    this.loadingFileOther = true;
    this.siteService.loadToServerVGP(this.contentOther, this.id_site, this.id_machine)
      .subscribe(result => {
        console.log(result);
        this.loadingFileOther = false;
        this.userHasChoosenFileOther = false;
        this.resetOther();
      }, (err) => {
        this.loadingFileOther = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  datepickerRun() {
       $(() => {
            this.dataService.datepickerFranceFormat();
            $( '#ui-datepicker-div, #vgp, #techControl' ).datepicker();
            $( '#ui-datepicker-div, #vgp, #techControl' ).datepicker( 'option', 'changeYear', true );

            $( '#format' ).change(function() {
                $( '#ui-datepicker-div, #vgp, #techControl' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

}
