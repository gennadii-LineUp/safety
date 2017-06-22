import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SiteService {
    public token: string;
    public id_site: number;





    private subject: Subject<number> = new Subject<number>();


    constructor(private backendService: BackendService) {
        this.token = localStorage.token;
    }








    public setIdSite(id_site: number) {
        this.id_site = id_site;
        console.log('setted ' + this.id_site);
    }
    public getIdSite():number {
        console.log('getting... ' + this.id_site);
        return this.id_site;
    }


    homeData(): Observable<any> {
        //console.log('==admin service:_homeData started==');
        let useTolkin:boolean = true;

        return this.backendService.get(UrlParams.adminHome, useTolkin);

    }


    clientList(page): Observable<any> {
        //console.log('==admin service:_clientList started==');
        let useTolkin:boolean = true;
        let query = '?q=&sort=&page=';

        return this.backendService.get(UrlParams.adminClients + query + page, useTolkin);

    }


    findClientByName(name: string, page: any): Observable<any> {
        //console.log('==admin service:_findClientByName started==');
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.adminClients + query, useTolkin);

    }


    addNewEmployee(newEmployee: any): Observable<any> {
        //console.log('==site service:_addNewEmployee started==');
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.siteNewEmployeeEtap1, JSON.stringify(newEmployee), useTolkin);

    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


    encode(obj) {
        let newData = '';
        for (let key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        console.log(newData);
        return newData;
    }




}
