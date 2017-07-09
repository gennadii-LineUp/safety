import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router}    from '@angular/router';
import {SiteService} from '../../../../services/site/site.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';
import {ClientService} from '../../../../services/client/client.service';
import {EmployeesClass} from 'app/models/const/employees-class';
import {VisitesClass} from '../../../../models/const/visites-class';
import {AttestationClass} from '../../../../models/const/attestations-class';
import {TableSortService} from '../../../../services/table-sort.service';
declare var $:any;

@Component({
  selector: 'app-site-salaries-creation-etap2',
  templateUrl: './site-salaries-creation-etap2.component.html',
  styleUrls: ['./site-salaries-creation-etap2.component.css'],
    providers: [SiteService, ClientService, TableSortService]
})
export class SiteSalariesCreationEtap2Component implements OnInit {
    loading = false;
    loadingDatesAutorisations = true;
    loadingAttestations = true;
    creatingAttest = false;
    loadingSalarieUsed = false;
    loadingGroupes = true;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    loadingFile: boolean = false;
    uploadedFile: boolean = false;
    uploadFileText: string = 'fichier1.jpg';

    saveButtonCaptionAttest = 'Enregistrer';
    itemForChange = 0;

    errorSalaries: boolean = false;
    salariesMaxPossible:number;
    salariesUsed:number;

    emptyTable: boolean = true;

    id_site: number;
    id_salarie: number;
    private sub: any;

    checkedGroupFromEtap1:any;

    chariotsElevateurs: boolean = true;
    gruesMobiles: boolean = false;

    Type = [
        { value: 'chariotsElevateurs', display: 'Chariots élévateurs R.389' },
        { value: 'gruesMobiles', display: 'Grues mobiles R.383m' }
    ];

    headers: any[] = [
        { display: 'Nom', variable: 'name', filter: 'text' }//,
        // { display: 'Date de délivrance',variable: 'dateIssue',    filter: 'text' },
        // { display: 'Date d’expiration', variable: 'dateExpires',  filter: 'text' }
    ];
    sortingTarget = '';

    public employeeGroupes = [];
    employees = new EmployeesClass('', '', '', '', '', '', true, '', '', 0);
    visites = new VisitesClass('', '');
    public employeeAttestations = [];
    attestation = new AttestationClass('', '', '');


  public getSortingTarget() {
        this.sortingTarget = this.tableSortService._getSortingTarget();
    }

    constructor(private siteService: SiteService,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router,
                private route: ActivatedRoute,
                private tableSortService: TableSortService) { }


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

    file: File;
    userHasChoosenFile: boolean = false;
    public fileChange(event) {
        this.loadingFile = false;
        this.uploadedFile = false;
        let fileList: FileList = event.target.files;
        console.log(fileList);
        if(fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];
            this.uploadFileText = this.file.name;
        }
    }


    public ShowType(userChoice: string) {
        if (userChoice === 'gruesMobiles') {
            this.chariotsElevateurs = false;
            this.gruesMobiles = true;
        } else {
            this.gruesMobiles = false;
            this.chariotsElevateurs = true;
        }
        console.log(userChoice);

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
                    this.employees.birthDate = result.birthDate;
                    this.employees.numSecu = result.numSecu;
                    this.employees.validityPeriod = result.validityPeriod;
                    this.employees.startDate = result.startDate;
                    this.employees.endDate = result.endDate;
                    this.employees.employeeGroup = result.employeeGroup;

                    this.employees.birthDate = this.siteService.convertDataForInputView(result.birthDate);
                    this.loaded = true;
                    window.setTimeout(() => this.checkedGroupFromEtap1 = result.employeeGroup.id, 100);
                    this.getAttestations('');
                    this.getDatesAutorisations();
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
        let datepicker_birthDate = window.document.getElementsByClassName('datepicker-default')['0'].value;

        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.employees.birthDate = datepicker_birthDate;
        console.dir(this.employees);

        this.siteService.updateEmployee(this.employees, this.id_site, this.id_salarie)
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

        this.attestation.dateExpires = dateExpires;
        this.attestation.dateIssue = dateIssue;
        console.dir(this.attestation);

        this.siteService.setAttestation(this.attestation, this.id_site, this.id_salarie, urlOption)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    this.successCreating = 'Well done! You saved this Attestation.';
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
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            });
    }



    public submitDatesAutorisationsForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let datepicker_medicalVisit = window.document.getElementsByClassName('datepicker-default')['1'].value;
        let datepicker_caces = window.document.getElementsByClassName('datepicker-default')['2'].value;

        this.visites.medicalVisitDateExpires = datepicker_medicalVisit;
        this.visites.cacesDateExpires = datepicker_caces;
        console.log(this.visites);

        this.siteService.addMedicaleCacesDates(this.visites, this.id_site, this.id_salarie)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    //this.successCreating = "Well done! You've saved MedicaleCacesDates.";

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


    // public getAutorisations(sort) {
    //     this.loading = true;
    //     this.emptyTable = false;
    //     let _name = name;
    //     if (name === 'lineUp') {
    //         _name = localStorage.adminLinkSearch_name;
    //     }
    //
    //     this.siteService.findLinksByName(_name, page, sort)
    //         .subscribe(result => {
    //             if (result) {
    //                 this.cancellMessages();
    //
    //                 console.log(result);
    //                 this.links = result.items;
    //                 this.totalItems = +result.pagination.totalCount;
    //                 if (this.totalItems === 0) {
    //                     this.emptyTable = true;
    //                 }
    //                 console.log('ITEMS  ' + this.totalItems);
    //                 this.currentPage = +result.pagination.current;
    //
    //                 this.setPage(this.currentPage);
    //
    //                 setTimeout(() => {
    //                     this.adminService.siteService.tableMobileViewInit();
    //                 }, 200);
    //                 localStorage.setItem('adminLinkSearch_name', _name);
    //             }
    //         }, (err) => {
    //             this.loading = false;
    //             this.emptyTable = true;
    //             console.log(err);
    //             this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
    //         });
    // }

  public getDatesAutorisations() {
    this.loadingDatesAutorisations = true;

    this.siteService.getMedicaleCacesDates(this.id_site, this.id_salarie)
      .subscribe(result => {
        if (result) {
          this.loadingDatesAutorisations = false;
          this.visites.cacesDateExpires = this.siteService.convertDataForInputView(result.cacesDateExpires);
          this.visites.medicalVisitDateExpires = this.siteService.convertDataForInputView(result.medicalVisitDateExpires);
        }
      }, (err) => {
        this.loadingDatesAutorisations = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getAttestations(sort: string) {
        this.loadingAttestations = true;
        //this.emptyTable = false;
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
                    this.attestation.dateExpires = this.siteService.convertDataForInputView(result.dateExpires);
                    this.attestation.dateIssue = this.siteService.convertDataForInputView(result.dateIssue);
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
    }
    private cancellErrorMessage() {
        this.loading = false;
        this.loadingGroupes = false;
        this.errorLoad = '';
        this.errorCreating = '';
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
            $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker();
            $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'changeYear', true );
            // Pass the user selected date format
            $( '#format' ).change(() => {
                $( '#birthDate, #visiteMedicale, #caces, #attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }

}
