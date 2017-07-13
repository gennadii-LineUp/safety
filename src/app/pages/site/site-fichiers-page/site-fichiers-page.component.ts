import { Component, OnInit } from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from "../../../services/error/error-message-handler.service";
import {PaginationService} from "../../../services/pagination/pagination.service";
import {FichiersClass} from "../../../models/const/site-fichiers-class";

@Component({
  selector: 'site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService, TableSortService, PaginationService]
})
export class SiteFichiersPageComponent implements OnInit {
    emptyTable: boolean = true;
    loading: boolean = false;
    creating: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

    id_site: number;

    loadingFile: boolean = false;
    uploadedFile: boolean = false;
    uploadFileText: string = '.pdf fichier';

    fichiers = [];
    newFichier = new FichiersClass('', []);
    id_fichier: number;

    pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    public employeeGroupes = [];

    sortingTarget = '';
    headers: any[] = [
        { display: 'Nom du fichier',    variable: 'name', filter: 'text' }// ,
        // { display: 'Groupe d’employés', variable: 'sites', filter: 'text' }
    ];
    public getSortingTarget() {
      this.sortingTarget = this.tableSortService._getSortingTarget();
    }

    constructor (private siteService: SiteService,
                 private errorMessageHandlerService: ErrorMessageHandlerService,
                 private paginationService: PaginationService,
                 private tableSortService: TableSortService) {}

    ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.findFichiersByNameFunction('', 1, '');
        this.siteService.tableMobileViewInit();
        this.getEmployeeGroupes();
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

  public getEmployeeGroupes() {
    // this.noGroups = false;
    // this.clientService.getGroupList()
    //   .subscribe(result => {
    //     if (result) {
    //       if (result.length === 0) {
    //         this.noGroups = true;
    //       } else {
    //         this.noGroups = false;
    //       }
    //       this.cancellErrorMessage();
    //       this.employeeGroupes = result;
    //     }
    //   }, (err) => {
    //     console.log('====error=============');
    //     this.noGroups = true;
    //     this.cancellErrorMessage();
    //     console.log(err);
    //
    //     if (err.status === 403) {
    //       this.errorLoad = "Il n'y a pas de groupes disponibles. Créez-les d'abord ...";
    //       return;
    //     }
    //     this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
    //   });
  }

// FichiersClass

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginationService.getPager(this.totalItems, page);
  }


  public onInitChecking() {
    this.searchName = localStorage.search_name;
    this.activePage = +localStorage.search_page;

    if (this.searchName && this.activePage) {
      this.findFichiersByNameFunction(this.searchName, this.activePage + 1, '');
    } else {
      this.findFichiersByNameFunction('', 1, '');
    }
  }


  public findFichiersByNameFunction(name: string, page: any = 1, sort: string) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    let _name = name;
    if (name === 'lineUp') {
      _name = localStorage.search_name;
    }
    this.activePage = page;

    this.siteService.findFichiersByName(_name, page, this.id_site, sort)
      .subscribe(result => {
        if (result) {
          this.loading = false;

          console.log(result);
          this.fichiers = result.items;
          console.log(this.fichiers);
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

  file: File;
  content: any;
  userHasChoosenFile: boolean = false;
  public fileChange(event) {
    this.loadingFile = false;
    this.uploadedFile = false;

    let fileList: FileList = event.target.files;
   // console.log(fileList);
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];
      this.uploadFileText = this.file.name;

      let reader = new FileReader();
      reader.onload = (e) => {
       // console.log(e.target);
        this.content = e.target;
       // console.log(this.file);

      }

      const res = reader.readAsDataURL(event.target.files[0]);
     // console.log(res);          // undefined


    }
  }

  public fileChange_new(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      console.log(formData);

      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`${this.apiEndPoint}`, formData, options)
      //   .map(res => res.json())
      //   .catch(error => Observable.throw(error))
      //   .subscribe(
      //     data => console.log('success'),
      //     error => console.log(error)
      //   )
    }
  }


  public submitForm(name: string, address: string, postalCode: string, city: string, notificationEmails: string,
                    cacesSiege: boolean,
                    cacesSite: boolean,
                    medicalVisitSiege: boolean,
                    medicalVisitSite: boolean,
                    techControlSiege: boolean,
                    techControlSite: boolean) {

    this.cancellMessages();
    this.creating = true;
    //console.log(this.content.result);

    // let newSite = new SiteClass(name, address, postalCode, city, notificationEmails,
    //   this._cacesSiege,
    //   this._cacesSite,
    //   this._medicalVisitSiege,
    //   this._medicalVisitSite,
    //   this._techControlSiege,
    //   this._techControlSite);

    // console.dir(newSite);

   // if (this.userHasChoosenFile) {
      this.loadingFile = true;
      this.siteService.sendPDFtoServer(this.file, this.content, this.id_site)
        .subscribe(result => {
          if (result) {
            console.log(result);
            this.loadingFile = false;
            this.uploadedFile = true;
            this.id_fichier = result.id;

            // this.clientService.addNewSite(this.id_site, this.newFichier, this.id_fichier)
            //   .subscribe(result => {
            //     if (result) {
            //       this.cancellMessages();
            //       console.log(result);
            //
                  this.successCreating = "Well done! You've created a new client.";
            //
            //       this.creating = false;
            //       this.userHasChoosenFile = false;
            //       this.ngOnInit();
            //     }
            //   }, (err) => {
            //     this.creating = false;
            //     console.log(err);
            //
            //     this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
            //   });

          }
        }, (err) => {
          this.loadingFile = false;
          this.uploadFileText = '  error  error  error';
          console.log(err);
          this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
        });
   // }

  }

  public deleteFunction(id_itemForDelete: number) {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;

    this.siteService.deleteEmployee(this.id_site, id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.findFichiersByNameFunction(this.searchName, this.activePage, '');
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

}
