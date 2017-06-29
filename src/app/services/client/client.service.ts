import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';
import {SiteClass} from '../../models/const/site-class';

@Injectable()
export class ClientService {
    public token: string;

    constructor(private backendService: BackendService) {
        this.token = localStorage.token;
    }


    public getClientProfilData(): Observable<any> {
        console.log('==client service started==');
        let useTolkin:boolean = false;

        return this.backendService.get(UrlParams.clientProfilData, useTolkin);
    }

    public employeeCount(): Observable<any> {
        console.log('==client service started==');
        let useTolkin:boolean = false;

        return this.backendService.get(UrlParams.employeeCount, useTolkin);
    }

    public findSiteByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.clientSites + query, useTolkin);
    }

    public findSalarieByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.clientEmployees + query, useTolkin);
    }

    public addNewSite(newSite: any): Observable<any> {
        console.log('==client service:_addNewSite started==');
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.clientSites, JSON.stringify(newSite), useTolkin);
    }

    public getGroupList(): Observable<any> {
        //console.log('==client service:_groupList started==');
        let useTolkin:boolean = true;

        return this.backendService.get(UrlParams.employeesGroupsList, useTolkin);
    }

    public findGroupeByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.clientGroupes + query, useTolkin);
    }

    public addNewGroupe(newGroupe: any): Observable<any> {
        console.log('==client service:_addNewGroupe started==');
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.clientGroupes, JSON.stringify(newGroupe), useTolkin);
    }


    public uploadImage(file: any, siteId: number): Observable<any> {
        console.log('==client service:_uploadImage started==');
        let useTolkin:boolean = true;
        let formData:FormData = new FormData();
        formData.append('image', file, file.name);

        return this.backendService.loadImage_post(UrlParams.siteHome+siteId+'/image', formData, useTolkin);
    }

    public updateClientProfile(newProfile: any): Observable<any> {
        console.log('==client service:_updateClientProfile started==');
        let useTolkin:boolean = true;

        return this.backendService.post('http://sfapi:8000/app_dev.php/client/profile', JSON.stringify(newProfile), useTolkin);
    }//UrlParams.clientProfilData

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
        this.token = null;
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
