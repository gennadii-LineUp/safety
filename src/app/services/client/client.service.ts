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


    getClientProfilData(): Observable<any> {
        let useTolkin:boolean = false;

        return this.backendService.get(UrlParams.clientProfilData, useTolkin);
    }


    addNewSite(newSite: any): Observable<any> {
         let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.clientSites, JSON.stringify(newSite), useTolkin);
    }

    groupList(page): Observable<any> {
        let useTolkin:boolean = true;
        let query = '?q=&sort=&page=';

        return this.backendService.get(UrlParams.clientGroupes + query + page, useTolkin);

    }

    findGroupeByName(name: string, page: any): Observable<any> {
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.clientGroupes + query, useTolkin);

    }

    addNewGroupe(newGroupe: any): Observable<any> {
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.clientGroupes, JSON.stringify(newGroupe), useTolkin);
    }


    encode(obj) {
        let newData = '';
        for (let key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        return newData;
    }


    logout(): void {
        this.token = null;
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }

}
