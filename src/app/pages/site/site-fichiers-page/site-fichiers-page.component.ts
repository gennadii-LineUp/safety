import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from "../../../services/error/error-message-handler.service";
import {PaginationService} from "../../../services/pagination/pagination.service";
import {FichiersClass} from "../../../models/const/site-fichiers-class";
import {ClientService} from "../../../services/client/client.service";

@Component({
  selector: 'site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService, ClientService, TableSortService, PaginationService]
})
export class SiteFichiersPageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loadingGroupes = true;
    creating = false;
    loadingSalarieUsed = false;
    loaded = false;
    loadedSalarieUsed = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';

    id_site: number;

    loadingFile = false;
    uploadedFile = false;
    uploadFileText = '.pdf fichier';

    id_newFichier: number;

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

    fichiers = [];
    newFichier = new FichiersClass('', []);
    categoryNewFichier_active = 3;
    categoryNewFichier_nullData = true;

  public getSortingTarget() {
      this.sortingTarget = this.tableSortService._getSortingTarget();
    }



  constructor (private siteService: SiteService,
                 private clientService: ClientService,
                 private errorMessageHandlerService: ErrorMessageHandlerService,
                 private paginationService: PaginationService,
                 private tableSortService: TableSortService) {}

    ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.findFichiersByNameFunction('', 1, '');
        this.siteService.tableMobileViewInit();
        this.id_site = localStorage.id_site;
        console.log('get from LS ' + this.id_site);
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

  public getEmployeeGroupes() {
    this.loadingGroupes = true;
    this.clientService.getGroupList()
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loadingGroupes = false;
          this.cancellMessages();
          this.employeeGroupes = result;
        }
      }, (err) => {
        this.cancellMessages();
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public addSubcategory(e: any) {
    const userInput = e.target;
    if (userInput.checked) {
      this.newFichier.employeeGroups.push(+userInput.name);
      this.newFichier.employeeGroups = this.newFichier.employeeGroups.filter((elem, index, self) => {
        return index === self.indexOf(elem);
      });
    }
    if (!userInput.checked) {
      this.newFichier.employeeGroups = this.newFichier.employeeGroups.filter(val => val !== +userInput.name);
    }

    if (this.newFichier.employeeGroups.length === 0) {
      this.categoryNewFichier_nullData = true;
    } else {
      this.categoryNewFichier_nullData = false;
    }
    console.log(this.newFichier.employeeGroups);

  }


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

          console.log(result.items);
          let res = [];
          res = result.items;
          res.forEach((item, index, array) => {
            let ar = [];
            ar = item.employeeGroups;
            let gr_name = '';
            if (ar.length === 1) {
                  gr_name = ar[0].name + '; ';
                  console.log(gr_name);
              } else if (ar.length >= 2) {
                    ar.forEach((it, ind, arrr) => {
                        gr_name += arrr[ind].name + '; ';
                    });
                     console.log(gr_name);
            }
            array[index].employeeGroups = gr_name;
          });

          this.fichiers = res;
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
          this.getEmployeeGroupes();
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


  public submitForm(name: string) {
    if (this.newFichier.employeeGroups.length === 0) {
      this.categoryNewFichier_nullData = true;
      this.errorCreating = 'SAFETY:  At least 1 group have to be choosen.';
      return false;
    } else {
      this.categoryNewFichier_nullData = false;
    }

    this.cancellMessages();
    this.creating = true;
    console.log(this.newFichier);

    // console.log(this.content.result);

   // if (this.userHasChoosenFile) {
   //    this.loadingFile = true;
   //    this.siteService.sendPDFtoServer(this.file, this.content, this.id_site)
   //      .subscribe(result => {
   //        if (result) {
   //          console.log(result);
   //          this.loadingFile = false;
   //          this.uploadedFile = true;
   //          this.id_newFichier = result.id;

            this.siteService.addNewFichier(this.newFichier, this.id_site, 4)
              .subscribe(result => {
                if (result) {
                  this.cancellMessages();
                  console.log(result);

                  this.successCreating = "Well done! You've created a new client.";

                  this.creating = false;
                  this.userHasChoosenFile = false;
                  this.newFichier = new FichiersClass('', []);
                  this.findFichiersByNameFunction('', 1, '');
                }
              }, (err) => {
                this.creating = false;
                console.log(err);

                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
              });

        //   }
        // }, (err) => {
        //   this.loadingFile = false;
        //   this.uploadFileText = '  error  error  error';
        //   console.log(err);
        //   this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
        // });
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
    this.loadingGroupes = false;
    this.successCreating = '';
    this.errorLoad = '';
    this.errorCreating = '';
  }

}
