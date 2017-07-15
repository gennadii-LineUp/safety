import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {ClientService} from '../../../../services/client/client.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {VisitesClass} from '../../../../models/const/visites-class';
import {AttestationClass} from '../../../../models/const/attestations-class';
import {TableSortService} from '../../../../services/table-sort.service';
import {NgForm} from '@angular/forms';
import {DrivingLicenseClass} from '../../../../models/const/driving-license-class';
import {DrivingLicensesGlossary} from '../../../../models/const/driving-license-categories';
import {DataService} from '../../../../services/DataService.service';
declare var $: any;

@Component({
  selector: 'app-site-salaries-creation-etap2',
  templateUrl: './site-salaries-creation-etap2.component.html',
  styleUrls: ['./site-salaries-creation-etap2.component.css'],
    providers: [SiteService, ClientService, TableSortService, DrivingLicensesGlossary, DataService]
})
export class SiteSalariesCreationEtap2Component implements OnInit, OnDestroy {
    loading = false;
    loadingDatesAutorisations = true;
    loadingAttestations = true;
    creatingAttest = false;
    creatingDrivingLicense = false;
    loadingSalarieUsed = false;
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

    loadingFile = false;
    uploadedFile = false;
    uploadFileText = 'fichier1.jpg';

    saveButtonCaptionAttest = 'Enregistrer';
    itemForChange = 0;

    errorSalaries = false;
    salariesMaxPossible: number;
    salariesUsed: number;

    emptyTable = true;

    id_site: number;
    id_salarie: number;
    private sub: any;

    checkedGroupFromEtap1: any;

    activeSelect = '3';
    categoryDrivingLicense_active = 3;
    categoryDrivingLicense_nullData = false;
    subcategoryEquipement: number;
    TypeM = [
        { value: '3', display: 'VL' },
        { value: '4', display: 'PL' },
        { value: '5', display: 'Remorque' },
        { value: '6', display: 'Chariots élévateurs R.389' },
        { value: '7', display: 'PEMP (nacelle) R.386' },
        { value: '8', display: 'Ponts roulants R.318/423' },
        { value: '9', display: 'Engins de chantier R.372m' },
        { value: '10', display: 'Grues auxiliaire R.390' },
        { value: '11', display: 'Grues à tour R.377m' },
        { value: '12', display: 'Grues mobiles R.383m' }
    ];

    headers: any[] = [
        { display: 'Nom', variable: 'name', filter: 'text' }// ,
        // { display: 'Date de délivrance',variable: 'dateIssue',    filter: 'text' },
        // { display: 'Date d’expiration', variable: 'dateExpires',  filter: 'text' }
    ];
    sortingTarget = '';

    public employeeGroupes = [];
    employees = new EmployeesClass('', '', '', '', '', '', true, '', '', 0);
    visites = new VisitesClass('', '');
    public employeeAttestations = [];
    attestation = new AttestationClass('', '', '');
    drivingLicense = new DrivingLicenseClass([], 0);

  file: File;
  userHasChoosenFile = false;


  public getSortingTarget() {
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }

    constructor(private siteService: SiteService,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router,
                private route: ActivatedRoute,
                private tableSortService: TableSortService,
                private drivingLicensesGlossary: DrivingLicensesGlossary,
                private dataService: DataService) { }


    ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.id_salarie = localStorage.id_salarie;

        this.getEmployeeFromEtap1Function();
        this.siteService.tableMobileViewInit();
        this.getEmployeeGroupes();

        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.add('active');
        this.datepickerViewInit();
    }


    ngOnDestroy() {
        window.document.querySelectorAll('ul.list-unstyled li:nth-of-type(5)')['0'].classList.remove('active');
    }

    public fileChange(event) {
        this.loadingFile = false;
        this.uploadedFile = false;
        const fileList: FileList = event.target.files;
        console.log(fileList);
        if (fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];
            this.uploadFileText = this.file.name;
        }
    }


    public ShowType(userChoice: string) {
      console.log(userChoice);

      switch (userChoice) {
        case  '3':  this.activeSelect = this.TypeM[0].value;  break;
        case  '4':  this.activeSelect = this.TypeM[1].value;  break;
        case  '5':  this.activeSelect = this.TypeM[2].value;  break;
        case  '6':  this.activeSelect = this.TypeM[3].value;  break;
        case  '7':  this.activeSelect = this.TypeM[4].value;  break;
        case  '8':  this.activeSelect = this.TypeM[5].value;  break;
        case  '9':  this.activeSelect = this.TypeM[6].value;  break;
        case '10':  this.activeSelect = this.TypeM[7].value;  break;
        case '11':  this.activeSelect = this.TypeM[8].value;  break;
        case '12':  this.activeSelect = this.TypeM[9].value;  break;
        default:    this.activeSelect = this.TypeM[0].value;
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
                    this.employees.employeeGroup = result.employeeGroup;

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
                    window.setTimeout(() => this.checkedGroupFromEtap1 = result.employeeGroup.id, 100);
                    this.getDatesAutorisations();
                    this.getAttestations('');
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


    public submitModifyEtap1Form(modifyEmployeesForm: NgForm) {
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
                                                this.employees.employeeGroup.id);

        console.dir(employeeDates);

        this.siteService.updateEmployee(employeeDates, this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    this.successCreating = "Well done! You've updated this employee.";
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }


    public submitAttestationForm(attest_name: string, attest_dateDelivrance: string, attest_dateExpir: string) {
        let urlOption = '';
        if (this.itemForChange) {
          urlOption = '/' + this.itemForChange;
          this.saveButtonCaptionAttest = 'Modifier';
        }

        const dateIssue   = window.document.getElementsByClassName('datepicker-default')['3'].value;
        const dateExpires = window.document.getElementsByClassName('datepicker-default')['4'].value;

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
                    this.loading = false;
                    this.successCreatingAttestat = 'Well done! You saved this Attestation.';
                    if (this.itemForChange) {
                      this.saveButtonCaptionAttest = 'Enregistrer';
                      this.itemForChange = 0;
                    }
                    this.attestation = new AttestationClass('', '', '');
                    this.getAttestations('');
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorCreatingAttestat = this.errorMessageHandlerService.checkErrorStatus(err);
            });
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

                    // if (this.userHasChoosenFile) {
                    //     this.loadingFile = true;
                    //     this.siteService.uploadText(this.file, this.id_site, this.id_salarie)
                    //         .subscribe(result => {
                    //             if (result) {
                    //                 this.loadingFile = false;
                    //                 this.uploadedFile = true;
                    //                 console.log(result);
                    //                 this.successCreating = "Well done! You've uploaded file.";
                    //             }
                    //         }, (err) => {
                    //             this.loadingFile = false;
                    //             this.uploadFileText = '  error  error  error';
                    //             console.log(err);
                    //
                    //             this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
                    //         });
                    // }
                    // else {
                       // this.successCreating = "Well done! You've created a new client.";
                    // }

                    this.loading = false;
                    this.userHasChoosenFile = false;

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
            this.visites = new VisitesClass('', '');
          } else {
            console.log('hello');
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

    public getAttestForUpdateFunction(id_itemForUpdate: number) {
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
                    this.saveButtonCaptionAttest = 'Modifier';
                    this.itemForChange = result.id;
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
        console.log(id_itemForDelete);
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
    private cancellErrorMessage() {
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
        // Datepicker Popups calender to Choose date
        $(() => {
            this.dataService.datepickerFranceFormat();
            $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker();
            $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker({dateFormat: 'dd-mm-yy'});
            $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'changeYear', true );
            $( '#format' ).change(() => {
                $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
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

      if (this.drivingLicense.categories.length === 0) {
        this.categoryDrivingLicense_nullData = true;
        this.errorCreatingDrLicence = 'SAFETY:  At least 1 category have to be choosen.';
        return false;
      } else {
        this.categoryDrivingLicense_nullData = false;
      }

      if (this.categoryDrivingLicense_active === 12) {
        if (this.drivingLicense.equipment === 0) {
          this.categoryDrivingLicense_nullData = true;
          this.errorCreatingDrLicence = 'SAFETY:  At least 1 equipement have to be choosen.';
          console.log(this.drivingLicense.equipment);
          console.log(this.subcategoryEquipement);
          return false;
        }
      }

      this.creatingDrivingLicense = true;

      this.drivingLicense.categories = this.drivingLicense.categories.sort((a, b) => a - b);
      console.log(this.drivingLicense);

      this.siteService.setCategoryDrivingLicense(this.drivingLicense, this.id_site, this.id_salarie)
        .subscribe(result => {
          if (result) {
            this.creatingDrivingLicense = false;
            console.log(result);
            this.successCreatingDrLicence = 'Well done! You&aposve created new driving license.';
          }
        }, (err) => {
          this.creatingDrivingLicense = false;
          console.log(err);
          this.errorCreatingDrLicence = this.errorMessageHandlerService.checkErrorStatus(err);
        });
    }


}
