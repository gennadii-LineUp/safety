import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';
import {SiteClass} from '../../models/const/site-class';

@Injectable()
export class SalariesService {

    constructor(private backendService: BackendService) {}


    public getClientProfilData(): Observable<any> {
        console.log('==client service started==');
        return this.backendService.get(UrlParams.clientProfilData);
    }

    
    public employeeCount(): Observable<any> {
        console.log('==client service started==');
        return this.backendService.get(UrlParams.employeeCount);
    }

    public findSiteByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientSites + query);
    }

    public findSalarieByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientEmployees + query);
    }

    public addNewSite(newSite: any): Observable<any> {
        console.log('==client service:_addNewSite started==');
        return this.backendService.post(UrlParams.clientSites, JSON.stringify(newSite));
    }

    public getGroupList(): Observable<any> {
        return this.backendService.get(UrlParams.employeesGroupsList);
    }

    public findGroupeByName(name: string, page: any): Observable<any> {
        let query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientGroupes + query);
    }

    public addNewGroupe(newGroupe: any): Observable<any> {
        console.log('==client service:_addNewGroupe started==');
        return this.backendService.post(UrlParams.clientGroupes, JSON.stringify(newGroupe));
    }


    public uploadImage(file: any, siteId: number): Observable<any> {
        console.log('==client service:_uploadImage started==');
        let formData:FormData = new FormData();
        formData.append('image', file, file.name);

        return this.backendService.loadImage_post(UrlParams.siteHome+siteId+'/image', formData);
    }


    public encode(obj) {
        let newData = '';
        for (let key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        console.log(newData);
        return newData;
    }


    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll("th"),
            tablerows = document.querySelectorAll("th"),
            tablebody = document.querySelector("tbody");
        if (document.querySelector("table")) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,""));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        }
    }

}
