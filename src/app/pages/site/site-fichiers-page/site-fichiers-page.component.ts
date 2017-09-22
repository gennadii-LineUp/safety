import {Component, OnDestroy, OnInit} from '@angular/core';
import {SiteService} from '../../../services/site/site.service';
import {TableSortService} from '../../../services/table-sort.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {PaginationService} from '../../../services/pagination/pagination.service';
import {FichiersClass} from '../../../models/const/site-fichiers-class';
import {ClientService} from '../../../services/client/client.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css'],
    providers: [SiteService, ClientService, TableSortService, PaginationService, BackendService ]
})
export class SiteFichiersPageComponent extends BasePageComponent implements OnInit, OnDestroy {
    emptyTable = true;
    loading = false;
    loadingGroupes = true;
    creating = false;
    loaded = false;
    errorLoad = '';
    errorSalaries = '';
    errorCreating = '';
    successCreating = '';
    saveButtonCaption = 'Ajouter';

    itemForChange =  0;
    fileForChange = false;

    id_site: number;
    id_fichier = 0;

    noGroups = false;
    loadingFile = false;
    uploadedFile = false;
    uploadFileText = '.pdf fichier';
    file: File;
    content: any;
    userHasChoosenFile = false;
    id_itemForDelete: number;

    checkedGroups = [];

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
    original_fichiers = [];  // using for having original fichiers from server, without filtering groups name for view
    newFichier = new FichiersClass('', []);
    categoryNewFichier_active = 3;
    categoryNewFichier_nullData = true;

  public getSortingTarget() {
      this.sortingTarget = this.tableSortService._getSortingTarget();
    }

  constructor (public siteService: SiteService,
               public clientService: ClientService,
               public errorMessageHandlerService: ErrorMessageHandlerService,
               public paginationService: PaginationService,
               public tableSortService: TableSortService,
               public backendService: BackendService) { super(); }

  ngOnInit(): void {
        this.id_site = localStorage.id_site;
        this.getEmployeeGroupes();
        this.siteService.tableMobileViewInit();
        setTimeout(() => {
          this.findFichiersByNameFunction('', 1, '', '');
        }, 100);
    }
    ngOnDestroy() {
      localStorage.removeItem('search_name');
      localStorage.removeItem('search_page');
    }

  public getEmployeeGroupes() {
    this.cancellMessages();
    this.noGroups = false;
    this.loadingGroupes = true;
    this.doRequest(this.clientService, 'getGroupList', null, result => {
          if (result.length === 0) {
            this.noGroups = true;
          } else {
            this.noGroups = false;
          }
          this.loadingGroupes = false;
          if (result.length === 0) {
            this.errorLoad = 'Il n\'y a pas de "Groupes de salariés" disponibles. Créez-les d\'abord ...';
          } else {this.employeeGroupes = result; }
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

    this.doRequest(this.siteService, 'findFichiersByName', [_name, page, this.id_site, sort], result => {
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

  public fileChange(event) {
    this.loadingFile = false;
    this.uploadedFile = false;
    if (this.itemForChange) {this.fileForChange = true; }

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
    let urlOption = '';
    if (this.itemForChange && this.fileForChange) {
      urlOption = '/' + this.itemForChange;
      this.saveButtonCaption = 'Modifier';
    }
    // this.loadingFile = true;
    this.doRequest(this.siteService, 'sendFileToServer', [this.file, this.content, this.id_site, urlOption], result => {
          this.loadingFile = false;
          // this.uploadedFile = true;
          if (result.id) {
            this.id_fichier = result.id;
          }
          if (this.fileForChange) {
            this.fileForChange = false;
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
    if (this.id_fichier === 0) {
      this.errorCreating = 'Le fichier doit être ajouté.';
      return false;
    }
    this.creating = true;
    this.doRequest(this.siteService, 'addFichier', [this.newFichier, this.id_site, this.id_fichier], result => {
                  this.uploadedFile = true;
                  this.findFichiersByNameFunction('', 1, '', 'Vos modifications sont enregistrées.');
                  // modal close /////////
                  const _modal = document.getElementById('myModal').firstElementChild;
                  _modal.classList.add('hidden');
                  const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
                  (<HTMLScriptElement>modal_bg).classList.add('hidden');
                  /////////
                  if (this.id_fichier) {
                    this.saveButtonCaption = 'Ajouter';
                    this.id_fichier = 0;
                  }
                  this.creating = false;
                  this.userHasChoosenFile = false;
                  this.setEmptyFichiers();
              }, (err) => {
                this.creating = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
    });
  }

  public modalOpen() {
    // this.setEmptyFichiers();
    this.creating = false;
    this.userHasChoosenFile = false;
    const _modal = document.getElementById('myModal').firstElementChild;
    if (_modal) {_modal.classList.remove('hidden'); }
    const modal_bg = document.getElementsByClassName('fade in modal-backdrop')[0];
    if (modal_bg) {(<HTMLScriptElement>modal_bg).classList.remove('hidden'); }
  }


  get _checkedGroups() { // right now: ['1','3']
    return this.checkedGroups
      .map(opt => opt.id);
  }

  public setEmptyFichiers() {
    this.id_fichier = 0;
    this.itemForChange = 0;
    this.saveButtonCaption = 'Ajouter';
    this.newFichier = new FichiersClass('', []);
    this.newFichier.employeeGroups = [];
    this.checkedGroups = [];
    const checkedI: NodeListOf<Element> = window.document.querySelectorAll('input[type=checkbox]:checked');
    for (let i = 0; i < checkedI.length; i++) {
      (<HTMLInputElement>checkedI[i]).checked = false;
    }
    this.uploadFileText = '.pdf fichier';
    this.uploadedFile = false;
    return;
  }

  public modifierFunction(id_itemForUpdate: number) {
    this.modalOpen();
    this.cancellMessages();
    this.creating = true;
    this.itemForChange = id_itemForUpdate;
      // let result = (this.original_fichiers.filter(obj => {
    //   return obj.id === id_itemForUpdate;
    // }))[0];

    this.doRequest(this.siteService, 'getOneFichier', [this.id_site, id_itemForUpdate], result => {
          this.creating = false;
          this.newFichier.name = result.name;
          this.checkedGroups = result.employeeGroups;
          this.saveButtonCaption = 'Modifier';
          this.id_fichier = result.id;
          this.newFichier.employeeGroups = this._checkedGroups;

          if (this.newFichier.employeeGroups.length > 0) {
            this.categoryNewFichier_nullData = false;
          }
      }, (err) => {
        this.creating = false;
        console.log(err);
        this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public setItemForDelete(id_itemForDelete: number) {
    this.id_itemForDelete = id_itemForDelete;
    return;
  }
  public deleteFunction() {
    this.cancellMessages();
    this.loading = true;
    this.emptyTable = false;
    this.doRequest(this.siteService, 'deleteFichier', [this.id_site, this.id_itemForDelete], result => {
          this.loading = false;
          this.findFichiersByNameFunction(this.searchName, this.activePage, '', '');
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
