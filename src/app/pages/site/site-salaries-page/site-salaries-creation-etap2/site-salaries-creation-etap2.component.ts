import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {ClientService} from '../../../../services/client/client.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {VisitesClass} from '../../../../models/const/visites-class';
import {AttestationClass} from '../../../../models/const/attestations-class';
import {TableSortService} from '../../../../services/table-sort.service';
import {DrivingLicenseClass} from '../../../../models/const/driving-license-class';
import {DataService} from '../../../../services/DataService.service';
import {MachinesGlossary} from '../../../../models/const/machine-categorie';
declare var $: any;

@Component({
  selector: 'app-site-salaries-creation-etap2',
  templateUrl: './site-salaries-creation-etap2.component.html',
  styleUrls: ['./site-salaries-creation-etap2.component.css'],
    providers: [SiteService, ClientService, TableSortService, MachinesGlossary, DataService]
})
export class SiteSalariesCreationEtap2Component implements OnInit, OnDestroy {
    loading = false;
    loadingDatesAutorisations = true;
    loadingAttestations = true;
    loadingDrLicences = true;
    creatingAttest = false;
    creatingDrivingLicense = false;
    loadingGroupes = true;
    loaded = false;
    errorLoad = '';
    errorCreating = '';
    successCreating = '';
    errorCreatingDrLicence = '';
    successCreatingDrLicence = '';
    errorCreatingAttestat = '';
    successCreatingAttestat = '';

    startDate = false;
    endDate = false;
    datesAutorisationsEmpty = true;
    datesAttestationEmpty = true;

    saveButtonCaptionAttest = 'Enregistrer';
    saveButtonCaption_DrLicense = 'Enregistrer';
    itemForChange = 0;
    itemForChange_DrLicense = 0;

    errorSalaries = false;
    salariesMaxPossible: number;
    salariesUsed: number;

    emptyTable = true;
    emptyTable_drLicences = true;

    id_site: number;
    id_salarie: number;

    checkedGroupFromEtap1: number;

    loadingPhotoFilePhoto = true;
    uploadedFilePhoto = false;
    contentPhoto: any;
    showImgPhoto = false;
    filePhoto: FileList;
    userHasChoosenFilePhoto = false;
    imgServerPhoto: any;

    @ViewChild('fileInputCaces')
    cacesInput: any;

    @ViewChild('fileInputAttest')
    attestInput: any;

    loadingFileCaces = false;
    uploadedFileCaces = false;
    contentCaces: any;
    fileCaces: FileList;
    userHasChoosenFileCaces = false;
    uploadFileTextCaces = '';

    loadingFileAttest = false;
    uploadedFileAttest = false;
    contentAttest: any;
    fileAttest: FileList;
    userHasChoosenFileAttest = false;
    uploadFileTextAttest = '.pdf';

    activeSelect = '3';
    categoryDrivingLicense_active = 3;
    categoryDrivingLicense_nullData = false;
    subcategoryEquipement: number;
    checkedDrLicenses = [];

    headersAttest: any[] = [
        { display: 'Nom', variable: 'name', filter: 'text' }// ,
        // { display: 'Date de délivrance',variable: 'dateIssue',    filter: 'text' },
        // { display: 'Date d’expiration', variable: 'dateExpires',  filter: 'text' }
    ];
    headersPermis: any[] = [
      { display: 'Type', variable: 'type', filter: 'text' }
    ];
    sortingPermis: any = { column: 'type', descending: false };
    sortingTargetAttest = '';
    sortingTargetPermis = '';

    public employeeGroupes = [];
    employees = new EmployeesClass('', '', '', '', '', '', true, '', '', 0);
    visites = new VisitesClass('', '');
    public employeeAttestations = [];
    attestation = new AttestationClass('', '', '');
    drivingLicense = new DrivingLicenseClass([], 0);
    drivingLicenses = [];

    constructor(public siteService: SiteService,
                public clientService: ClientService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public router: Router,
                public route: ActivatedRoute,
                public tableSortService: TableSortService,
                public machinesGlossary: MachinesGlossary,
                public dataService: DataService) { }


    ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.id_salarie = localStorage.id_salarie;

        this.getEmployeeFromEtap1Function();
        this.siteService.tableMobileViewInit();
        this.getEmployeeGroupes();

        // $(document).ready(() => {
        //   this.datepickerViewInit();
        // });
    }


    ngOnDestroy() {
      // window.document.getElementById('siteSalariesMenu').classList.remove('active');
    }

  public getSortingTargetAttest() {
    this.sortingTargetAttest = this.tableSortService._getSortingTarget();
  }
  public selectedClass(columnName): string {
    return columnName === this.sortingPermis.column ? 'sort-button-' + this.sortingPermis.descending : 'double-sort-button';
  }
  public changeSorting(columnName: string, e: any): void {
    let sortingDirection: string;
    let thClass: string;
    const sort = this.sortingPermis;
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
    this.sortingTargetPermis = '&sort=' + sortingDirection + columnName;
  }


  public ShowType(userChoice: string) {
      console.log(userChoice);
      switch (userChoice) {
        case  '3':  this.activeSelect = this.machinesGlossary.TypeM[0].value;  break;
        case  '4':  this.activeSelect = this.machinesGlossary.TypeM[1].value;  break;
        case  '5':  this.activeSelect = this.machinesGlossary.TypeM[2].value;  break;
        case  '6':  this.activeSelect = this.machinesGlossary.TypeM[3].value;  break;
        case  '7':  this.activeSelect = this.machinesGlossary.TypeM[4].value;  break;
        case  '8':  this.activeSelect = this.machinesGlossary.TypeM[5].value;  break;
        case  '9':  this.activeSelect = this.machinesGlossary.TypeM[6].value;  break;
        case '10':  this.activeSelect = this.machinesGlossary.TypeM[7].value;  break;
        case '11':  this.activeSelect = this.machinesGlossary.TypeM[8].value;  break;
        case '12':  this.activeSelect = this.machinesGlossary.TypeM[9].value;  break;
        default:    this.activeSelect = this.machinesGlossary.TypeM[0].value;
      }
      this.categoryDrivingLicense_nullData = true;
      this.categoryDrivingLicense_active = +userChoice;
      this.drivingLicense = new DrivingLicenseClass([], 0);
      if (+userChoice === 3 ||
          +userChoice === 4 ||
          +userChoice === 5 ||
          +userChoice === 10) {
        this.drivingLicense.categories.push(+userChoice);
        this.categoryDrivingLicense_nullData = false;
      }
    }

    public getEmployeeFromEtap1Function() {
        // this.siteService.lightActiveMenu();
        this.loading = true;
        this.siteService.getEmployeeFromEtap1(this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.employees.name = result.name;
                    this.employees.surname = result.surname;
                    this.employees.email = result.email;
                    this.employees.post = result.post;
                    this.employees.numSecu = result.numSecu;
                    this.employees.validityPeriod = result.validityPeriod;
                    console.log(result.employeeGroup.id);
                    this.employees.employeeGroup = result.employeeGroup.id;
                    if (result.cacesFile) {this.uploadedFileCaces = true; }

                    if (result.startDate) {
                      this.employees.startDate = this.dataService.convertDateFromServerToInput(result.startDate);
                      this.startDate = true;
                    }
                    if (result.endDate) {
                        this.employees.endDate = this.dataService.convertDateFromServerToInput(result.endDate);
                        this.endDate = true;
                    }
                    this.employees.birthDate = this.dataService.convertDateFromServerToInput(result.birthDate);
                    console.log(this.employees);
                    this.loaded = true;
                    this.getFromServerProfileImageFunction();
                    window.setTimeout(() => this.checkedGroupFromEtap1 = this.employees.employeeGroup, 100);
                    this.getDatesAutorisations();
                    this.getAttestations('');
                    this.getDrivingLicenses('');
                }
            }, (err) => {
                this.loading = false;
                this.loaded = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public getEmployeeGroupes() {
        this.loadingGroupes = true;
        this.clientService.getGroupList()
            .subscribe(result => {
                if (result) {
                  console.log(result);
                    this.loadingGroupes = false;
                    this.cancellErrorMessage();
                    this.employeeGroupes = result;
                }
            }, (err) => {
                this.cancellErrorMessage();
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public submitModifyEtap1Form() {
        const datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let _startDate = this.employees.startDate;
        let _endDate = this.employees.endDate;
        if (this.employees.startDate) {
          _startDate = this.dataService.convertDateFromInputeToServer(this.employees.startDate);
        }
        if (this.employees.endDate) {
          _endDate = this.dataService.convertDateFromInputeToServer(this.employees.endDate);
        }

       const employeeDates = new EmployeesClass(this.employees.name,
                                                this.employees.surname,
                                                this.employees.email,
                                                this.employees.post,
                                                this.dataService.convertDateFromInputeToServer(datepicker_birthDate),
                                                this.employees.numSecu,
                                                this.employees.validityPeriod,
                                                _startDate,
                                                _endDate,
                                                this.employees.employeeGroup);

        console.dir(employeeDates);

        this.siteService.updateEmployee(employeeDates, this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.successCreating = 'Bravo! Vos modifications sont enregistrées.';
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public datesAttestationCheckFunction() {
      if (window.document.getElementsByClassName('datepicker-default')['3'].value
        && window.document.getElementsByClassName('datepicker-default')['4'].value) {
        this.datesAttestationEmpty = false;
      }
      return true;
    }


    public submitAttestationForm(attest_name: string, attest_dateDelivrance: string, attest_dateExpir: string) {
        let urlOption = '';
        if (this.itemForChange) {
          urlOption = '/' + this.itemForChange;
          this.saveButtonCaptionAttest = 'Modifier';
        }

        const dateIssue   = window.document.getElementsByClassName('datepicker-default')['3'].value;
        const dateExpires = window.document.getElementsByClassName('datepicker-default')['4'].value;

        if (dateIssue === ''  &&  dateExpires === '') {
          this.datesAttestationEmpty = false;
          this.errorCreatingAttestat = 'Déterminer la date';
          return true;
        }

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        const attestation = new AttestationClass(this.attestation.name,
                                                  this.dataService.convertDateFromInputeToServer(dateExpires),
                                                  this.dataService.convertDateFromInputeToServer(dateIssue));
        console.dir(attestation);

        this.siteService.setAttestation(attestation, this.id_site, this.id_salarie, urlOption)
            .subscribe(result => {
                if (result) {
                  let attestation_id: number;
                  attestation_id = result.id;
                  if (this.itemForChange) {attestation_id = this.itemForChange; }
                  if (!!attestation_id && this.userHasChoosenFileAttest) {
                    this.loadingFileAttest = true;
                    this.siteService.loadToServerAttestFile(this.contentAttest, this.id_site, this.id_salarie, attestation_id)
                      .subscribe(result => {
                        this.loadingFileAttest = false;
                        this.uploadedFileAttest = true;
                        console.log(result);
                        this.userHasChoosenFileAttest = false;
                        // modal close /////////
                        const _modal = document.getElementById('attestModal').firstElementChild;
                        _modal.classList.add('hidden');
                        const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                        (<HTMLScriptElement>modal_bg).classList.add('hidden');
                        /////////
                        this.resetAttestFile();
                      }, (err) => {
                        this.loadingFileAttest = false;
                        this.uploadFileTextAttest = '  error  error  error';
                        console.log(err);
                        this.errorCreatingAttestat = this.errorMessageHandlerService.checkErrorStatus(err);
                      });

                  }  else {
                    // modal close /////////
                    const _modal = document.getElementById('attestModal').firstElementChild;
                    _modal.classList.add('hidden');
                    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                    (<HTMLScriptElement>modal_bg).classList.add('hidden');
                    /////////
                    this.successCreating = "Well done! You've created a new client.";
                  }

                  this.getAttestations('');
                  this.loading = false;
                    this.successCreatingAttestat = 'Bien joué! Vous avez enregistré cette attestation.';
                    if (this.itemForChange) {
                      this.saveButtonCaptionAttest = 'Enregistrer';
                      this.itemForChange = 0;
                    }
                    this.attestation = new AttestationClass('', '', '');
                    (<HTMLInputElement>window.document.querySelectorAll('#attest_dateDelivrance')[0]).value = '';
                    (<HTMLInputElement>window.document.querySelectorAll('#attest_dateExpir')[0]).value = '';
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorCreatingAttestat = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public modalAttestOpen() {
        this.modalAttestClear();
        const _modal = document.getElementById('attestModal').firstElementChild;
        if (_modal) {_modal.classList.remove('hidden'); }
        const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
        if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
    }

    public modalAttestClear() {
      this.saveButtonCaptionAttest = 'Enregistrer';
      this.uploadedFileAttest = false;
      this.uploadFileTextAttest = '';
      this.attestation = new AttestationClass('', '', '');
      setTimeout(() => {
        window.document.getElementsByClassName('datepicker-default')['3'].value = '';
        window.document.getElementsByClassName('datepicker-default')['4'].value = '';
      }, 100);
    }

    public datesAutorisationsCheckFunction() {
        if (window.document.getElementsByClassName('datepicker-default')['1'].value
          && window.document.getElementsByClassName('datepicker-default')['2'].value) {
          this.datesAutorisationsEmpty = false;
        }
    }

    public submitDatesAutorisationsForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        const datepicker_medicalVisit = window.document.getElementsByClassName('datepicker-default')['1'].value;
        const datepicker_caces = window.document.getElementsByClassName('datepicker-default')['2'].value;

        const _datepicker_medicalVisit = this.dataService.convertDateFromInputeToServer(datepicker_medicalVisit);
        const _datepicker_caces = this.dataService.convertDateFromInputeToServer(datepicker_caces);

        const visites = new VisitesClass(_datepicker_medicalVisit, _datepicker_caces);
        console.log(visites);

        this.siteService.addMedicaleCacesDates(visites, this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    // this.successCreating = "Well done! You've saved MedicaleCacesDates.";

                    if (this.userHasChoosenFileCaces) {
                      this.loadingFileCaces = true;
                      this.siteService.loadToServerCacesFile(this.contentCaces, this.id_site, this.id_salarie)
                        .subscribe(result => {
                            this.loadingFileCaces = false;
                            this.uploadedFileCaces = true;
                            console.log(result);
                            this.userHasChoosenFileCaces = false;
                        }, (err) => {
                          this.loadingFileCaces = false;
                          this.uploadFileTextCaces = '  error  error  error';
                          console.log(err);
                          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
                        });

                    }  else {
                       this.successCreating = "Well done! You've created a new client.";
                    }
                    this.loading = false;
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


  public getDatesAutorisations() {
    this.loadingDatesAutorisations = true;
    this.visites = new VisitesClass('', '');

    this.siteService.getMedicaleCacesDates(this.id_site, this.id_salarie)
      .subscribe(result => {
        if (result) {
          console.log('====MedicaleCacesDates from server:');
          console.dir(result);
          this.loadingDatesAutorisations = false;

          if (result.medicalVisitDateExpires === null && result.cacesDateExpires === null) {
            this.datesAutorisationsEmpty = true;
            this.visites = new VisitesClass('', '');
          } else {
            this.datesAutorisationsEmpty = false;
            this.visites.medicalVisitDateExpires = this.dataService.convertDateForInputView(result.medicalVisitDateExpires);
            this.visites.cacesDateExpires = this.dataService.convertDateForInputView(result.cacesDateExpires);
          }
        }
      }, (err) => {
        this.loadingDatesAutorisations = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getAttestations(sort: string) {
        this.loadingAttestations = true;
        this.siteService.getAttestations(this.id_site, this.id_salarie, sort)
            .subscribe(result => {
                if (result) {
                    console.log(result.items);
                    this.loadingAttestations = false;
                    this.employeeAttestations = result.items;
                    this.emptyTable = false;
                    if (result.items.length === 0) {
                        this.emptyTable = true;
                    }
                }
            }, (err) => {
                this.loadingAttestations = false;
                this.emptyTable = true;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public getAttestForUpdateFunction(id_itemForUpdate) {
        this.modalAttestOpen();
        this.cancellErrorMessage();
        this.creatingAttest = true;
        this.attestation = new AttestationClass('', '', '');
        console.log(id_itemForUpdate);

        this.siteService.getOneAttestation(this.id_site, this.id_salarie, '/' + id_itemForUpdate)
            .subscribe(result => {
                if (result) {
                    this.creatingAttest = false;
                    console.log(result);
                    this.attestation.name = result.name;
                    this.attestation.dateExpires = this.dataService.convertDateForInputView(result.dateExpires);
                    this.attestation.dateIssue = this.dataService.convertDateForInputView(result.dateIssue);
                    this.datesAttestationEmpty = false;
                    this.saveButtonCaptionAttest = 'Modifier';
                    this.itemForChange = result.id;
                    if (result.attestationFile) {this.uploadedFileAttest = true; }
                }
            }, (err) => {
                this.creatingAttest = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }

    public deleteAttestFunction(id_itemForDelete: number) {
        this.loadingAttestations = true;
        this.emptyTable = false;
        this.siteService.deleteAttestation(this.id_site, this.id_salarie, '/' + id_itemForDelete)
            .subscribe(result => {
                if (result) {
                    this.cancellErrorMessage();
                    console.log(result);
                    this.getAttestations('');
                }
            }, (err) => {
                this.loadingAttestations = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public cancellErrorSalariesMessages() {
        this.errorSalaries = false;
    }

    public cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
        this.successCreatingAttestat = '';
        this.successCreatingDrLicence = '';
    }
  public cancellErrorMessage() {
        this.loading = false;
        this.loadingGroupes = false;
        this.errorLoad = '';
        this.errorCreating = '';
        this.errorCreatingAttestat = '';
        this.errorCreatingDrLicence = '';
    }


    gotoSalariesPage() {
        this.router.navigate(['/site', this.id_site, 'salaries']);
    }

    public startAttestationEmpty() {
      this.attestation = new AttestationClass('', '', '');
    }


    public datepickerViewInit() {
     // $(document).ready(function() {

       $(() => {
        this.dataService.datepickerFranceFormat();
        $('#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir').datepicker();
        $('#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir').datepicker('option', 'changeYear', true);
        $('#format').change(function () {
          $('#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir')
            .datepicker('option', 'dateFormat', $(this).val());
        });
       });
    // });
    }


    public addSubcategory(e: any) {
      const userInput = e.target;
      if (userInput.checked) {
          this.drivingLicense.categories.push(+userInput.name);
          this.drivingLicense.categories = this.drivingLicense.categories.filter((elem, index, self) => {
            return index === self.indexOf(elem);
          });
      }
      if (!userInput.checked) {
        this.drivingLicense.categories = this.drivingLicense.categories.filter(val => val !== +userInput.name);
      }

      if (this.drivingLicense.categories.length === 0) {
        this.categoryDrivingLicense_nullData = true;
      } else {
        this.categoryDrivingLicense_nullData = false;
      }
      console.log(this.drivingLicense.categories);
    }
    public addSubcategoryEquipement(e: any) {
        this.subcategoryEquipement = +e.target.id;
        console.log(this.subcategoryEquipement);
        this.drivingLicense.equipment = this.subcategoryEquipement;
        this.categoryDrivingLicense_nullData = false;
    }


  public submitCategoryDrivingLicense() {
      this.cancellErrorMessage();
      this.cancellSuccessMessage();

      let urlOption = '';
      if (this.itemForChange_DrLicense) {
        urlOption = '/' + this.itemForChange_DrLicense;
        this.saveButtonCaption_DrLicense = 'Modifier';
      }

    if (this.drivingLicense.categories.length === 0) {
        this.categoryDrivingLicense_nullData = true;
        this.errorCreatingDrLicence = 'SAFETY:  Au moins 1 catégorie doit être choisie.';
        return false;
      } else {
        this.categoryDrivingLicense_nullData = false;
      }

      if (this.categoryDrivingLicense_active === 12) {
        if (this.drivingLicense.equipment === 0) {
          this.categoryDrivingLicense_nullData = true;
          this.errorCreatingDrLicence = 'SAFETY:  Au moins 1 équipement doit être choisi.';
          return false;
        }
      }

      this.creatingDrivingLicense = true;

      this.drivingLicense.categories = this.drivingLicense.categories.sort((a, b) => a - b);
      console.log(this.drivingLicense);

      this.siteService.setCategoryDrivingLicense(this.drivingLicense, this.id_site, this.id_salarie, urlOption)
        .subscribe(result => {
          if (result) {
            console.log(result);
            this.getDrivingLicenses('');
            this.setEmptyDrivingLicense();
            if (this.itemForChange_DrLicense) {
              this.saveButtonCaption_DrLicense = 'Enregistrer';
              this.itemForChange_DrLicense = 0;
              this.successCreatingDrLicence = 'Bravo! Vos modifications sont enregistrées.';
            } else {
              this.successCreatingDrLicence = 'Bien joué! Vous avez créé un nouveau permis de conduire.';
            }
            this.creatingDrivingLicense = false;
          }
        }, (err) => {
          this.creatingDrivingLicense = false;
          console.log(err);
          this.errorCreatingDrLicence = this.errorMessageHandlerService.checkErrorStatus(err);
        });
    }

  public getDrivingLicenses(sort: string) {
    this.loadingDrLicences = true;
    this.siteService.getDrivingLicenses(this.id_site, this.id_salarie, sort)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loadingDrLicences = false;
          this.drivingLicenses = result.items;
          this.emptyTable_drLicences = false;
          if (result.items.length === 0) {
            this.emptyTable_drLicences = true;
          }
        }
      }, (err) => {
        this.loadingDrLicences = false;
        this.emptyTable_drLicences = true;
        if (err.status === 500) {
          return;
        } else {
          console.log(err);
          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
        }
      });
  }

  public setEmptySelect() {
    this.activeSelect = '3';
    this.categoryDrivingLicense_active = 3;
    this.setEmptyDrivingLicense();
    return;
  }
  public setEmptyDrivingLicense() {
    this.drivingLicense = new DrivingLicenseClass([], 0);
    this.checkedDrLicenses = [];
    const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkedI.length; i++) {
      (<HTMLInputElement>checkedI[i]).checked = false;
    }
    this.saveButtonCaption_DrLicense = 'Enregistrer';
    return;
  }

  public getDrLicenseForUpdateFunction(id_itemForUpdate: number, activeSelect: number) {
    this.setEmptyDrivingLicense();
    this.cancellErrorMessage();
    this.creatingDrivingLicense = true;
    console.log(id_itemForUpdate);
    this.activeSelect = '' + activeSelect;

    this.siteService.getOneDrLicense(this.id_site, this.id_salarie, id_itemForUpdate)
      .subscribe(result => {
        if (result) {
          this.creatingDrivingLicense = false;
          console.log(result);
          this.saveButtonCaption_DrLicense = 'Modifier';
          this.itemForChange_DrLicense = id_itemForUpdate;
          this.drivingLicense.categories = result.categories;
          this.checkedDrLicenses = result.categories;
          console.log(this.checkedDrLicenses);
        }
      }, (err) => {
        this.creatingDrivingLicense = false;
        console.log(err);
        this.errorCreatingDrLicence = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public deleteDrLicenseFunction(id_itemForDelete: number) {
    this.loadingDrLicences = true;
    this.emptyTable_drLicences = false;
    console.log(id_itemForDelete);
    this.siteService.deleteDrLicense(this.id_site, this.id_salarie, '/' + id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.loadingDrLicences = false;
          this.cancellErrorMessage();
          console.log(result);
          this.getDrivingLicenses('');
        }
      }, (err) => {
        this.loadingDrLicences = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public resetCacesFile() {
    this.userHasChoosenFileCaces = false;
    this.cacesInput.nativeElement.value = '';
    console.log(this.cacesInput.nativeElement.files);
    // this.uploadFileTextCaces = '';
  }
  public resetAttestFile() {
    this.userHasChoosenFileAttest = false;
    this.attestInput.nativeElement.value = '';
    this.uploadFileTextAttest = '';
  }

  public fileChangeCaces(event) {
    console.log('======fileChange Caces======');
    this.loadingFileCaces = false;
    this.uploadedFileCaces = false;
    this.fileCaces = event.target.files;
    if (this.fileCaces.length > 0) {
      this.userHasChoosenFileCaces = true;
      let fileList = this.fileCaces[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentCaces = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.uploadFileTextCaces = fileList.name;
    }
  }

  public fileChangeAttest(event) {
    console.log('======fileChange Attest======');
    this.loadingFileAttest = false;
    this.uploadedFileAttest = false;
    this.fileAttest = event.target.files;
    if (this.fileAttest.length > 0) {
      this.userHasChoosenFileAttest = true;
      let fileList = this.fileAttest[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentAttest = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);
      this.uploadFileTextAttest = fileList.name;
    }
  }

  public fileChangePhoto(event) {
    this.uploadedFilePhoto = false;
    this.filePhoto = event.target.files;
    if (this.filePhoto.length > 0) {
      this.loadingPhotoFilePhoto = true;
      this.userHasChoosenFilePhoto = true;
      // let fileList = this.filePhoto[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        this.contentPhoto = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);

      setTimeout(() => {
        this.loadToServerEmpImageFunction();
      }, 500);
    }
  }

  public loadToServerEmpImageFunction() {
    this.loadingPhotoFilePhoto = true;
    this.siteService.loadToServerEmployeeImage(this.contentPhoto, this.id_site, this.id_salarie)
      .subscribe(result => {
            this.getFromServerProfileImageFunction();
      }, (err) => {
        this.loadingPhotoFilePhoto = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getFromServerProfileImageFunction() {
    this.loadingPhotoFilePhoto = true;
    this.uploadedFilePhoto = false;
    this.siteService.getFromServerEmplImage(this.id_site, this.id_salarie)
      .subscribe(result => {
        if (result) {
          this.loadingPhotoFilePhoto = false;
          this.showImgPhoto = true;
          const src = 'data:' + result.contentType + ';base64,';
          this.imgServerPhoto = src + result.content;
        }
      }, (err) => {
        this.loadingPhotoFilePhoto = false;
        if (err.status === 500) {
          return;
        } else {
          console.log(err);
          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
        }
      });
  }


}
