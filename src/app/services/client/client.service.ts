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

}
