import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {FichiersClass} from '../../../models/const/site-fichiers-class';
import {ClientService} from '../../../services/client/client.service';

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
    saveButtonCaption = 'Ajouter';

    id_site: number;
    id_fichier = 0;

    loadingFile = false;
    uploadedFile = false;
    uploadFileText = '.pdf fichier';

    checkedGroups = [];

    pager: any = {};
    totalItems = 0;
    activePage = 1;
    searchName = '';
    currentPage: any;

    file: File;
    content: any;
    userHasChoosenFile = false;

    public employeeGroupes = [];

    sortingTarget = '';
    headers: any[] = [
        { display: 'Nom du fichier',    variable: 'name', filter: 'text' }// ,
        // { display: 'Groupe d’employés', variable: 'sites', filter: 'text' }
    ];

    fichiers = [];
    original_fichiers = [];  // using for having original fichiers from server, without filtering groups name for view
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
        this.findFichiersByNameFunction('', 1, '', '');
        this.siteService.tableMobileViewInit();
        setTimeout(() => {
          this.getEmployeeGroupes();
        }, 1000);
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

  public getEmployeeGroupes() {
    this.cancellMessages();
    this.loadingGroupes = true;
    this.clientService.getGroupList()
      .subscribe(result => {
        if (result) {
          this.loadingGroupes = false;
          this.employeeGroupes = result;
        }
      }, (err) => {
        this.loadingGroupes = false;
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
      this.findFichiersByNameFunction(this.searchName, this.activePage + 1, '', '');
    } else {
      this.findFichiersByNameFunction('', 1, '', '');
    }
  }


  public findFichiersByNameFunction(name: string, page: any = 1, sort: string, message: string) {
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
          if (message) {this.successCreating = message; }
          this.original_fichiers = result.items;
          this.loading = false;
          let res = [];
          res = result.items;
          res.forEach((item, index, array) => {
            let ar = [];
            ar = item.employeeGroups;
            let gr_name = '';
            if (ar.length === 1) {
                  gr_name = ar[0].name + '; ';
              } else if (ar.length >= 2) {
                    ar.forEach((it, ind, arrr) => {
                        gr_name += arrr[ind].name + '; ';
                    });
            }
            array[index].employeeGroups = gr_name;
          });
          this.fichiers = res;
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

  public fileChange(event) {
    this.loadingFile = false;
    this.uploadedFile = false;

    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];
      this.uploadFileText = this.file.name;

      let reader = new FileReader();
      reader.onload = (e) => {
        this.content = e.target;
        this.sendFileToServer();
      };
      const res = reader.readAsDataURL(event.target.files[0]);
    }
  }

  public sendFileToServer() {
    console.log(this.content);
    this.loadingFile = true;
    this.siteService.sendPDFtoServer(this.file, this.content, this.id_site)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.loadingFile = false;
          this.uploadedFile = true;
          this.id_fichier = result.id;
        }
      }, (err) => {
        this.loadingFile = false;
        this.uploadFileText = '  error  error  error';
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
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
    this.siteService.addFichier(this.newFichier, this.id_site, this.id_fichier)
              .subscribe(result => {
                if (result) {
                  this.findFichiersByNameFunction('', 1, '', 'Vos modifications sont enregistrées.');
                  console.log(result);
                  // modal close /////////
                  const _modal = document.getElementById('myModal').firstElementChild;
                  _modal.classList.remove('in');
                  _modal.classList.remove('fade');
                  (<HTMLScriptElement>_modal).style.display = 'none';
                  document.body.className = document.body.className.replace(/modal-open\b/, '');
                  const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                  document.body.removeChild(modal_bg);
                  // /////////
                  if (this.id_fichier) {
                    this.saveButtonCaption = 'Ajouter';
                    this.id_fichier = 0;
                  }
                  this.creating = false;
                  this.userHasChoosenFile = false;
                  this.setEmptyFichiers();
                }
              }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
    });
  }


  get _checkedGroups() { // right now: ['1','3']
    return this.checkedGroups
      .map(opt => opt.id);
  }

  public setEmptyFichiers() {
    this.newFichier = new FichiersClass('', []);
    this.newFichier.employeeGroups = [];
    this.checkedGroups = [];
    const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkedI.length; i++) {
      (<HTMLInputElement>checkedI[i]).checked = false;
    }
    return;
  }

  public modifierFunction(id_itemForUpdate: number) {
    this.cancellMessages();
    this.creating = true;
    this.setEmptyFichiers();

    // let result = (this.original_fichiers.filter(obj => {
    //   return obj.id === id_itemForUpdate;
    // }))[0];

    this.siteService.getOneFichier(this.id_site, id_itemForUpdate)
      .subscribe(result => {
        if (result) {
          this.creating = false;
          console.log(result);
          this.newFichier.name = result.name;
          this.checkedGroups = result.employeeGroups;
          this.saveButtonCaption = 'Modifier';
          this.id_fichier = result.id;
          this.newFichier.employeeGroups = this._checkedGroups;

          if (this.newFichier.employeeGroups.length > 0) {
            this.categoryNewFichier_nullData = false;
          }

          console.log(this.newFichier);
          console.log(this.checkedGroups);

          console.log(this._checkedGroups);
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
    this.siteService.deleteFichier(this.id_site, id_itemForDelete)
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.findFichiersByNameFunction(this.searchName, this.activePage, '', '');
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
