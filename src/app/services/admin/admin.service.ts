import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdminService {
    public token: string;

    constructor(private backendService: BackendService) {
        this.token = localStorage.token;
    }

    homeData(): Observable<any> {
        let useTolkin:boolean = true;

        return this.backendService.get(UrlParams.adminHome, useTolkin);

    }



    clientList(page): Observable<any> {
        let useTolkin:boolean = true;
        let query = '?q=&sort=&page=';

        return this.backendService.get(UrlParams.adminClients + query + page, useTolkin);

    }


    findClientByName(name: string, page: any): Observable<any> {
        let useTolkin:boolean = true;
        let query = '?q=' + name + '&page=' + page;

        return this.backendService.get(UrlParams.adminClients + query, useTolkin);

    }


    addNewClient(newClient: any): Observable<any> {
        let useTolkin:boolean = true;

        return this.backendService.post(UrlParams.adminClients, JSON.stringify(newClient), useTolkin);

    }


    logout(): void {
        this.token = null;
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


 }
