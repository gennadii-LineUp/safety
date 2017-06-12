import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SiteService {
    public token: string;

    constructor(private backendService: BackendService) {
        this.token = localStorage.token;
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


    addNewClient(newClient: any): Observable<any> {
        console.log('==admin service:_addNewClient started==');
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.adminClients, JSON.stringify(newClient), useTolkin);

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
