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
        console.log('==admin service:_homeData started==');
        let useTolkin:boolean = true;

        return this.backendService.get(UrlParams.adminHome, useTolkin);

    }


    clientList(): Observable<any> {
        console.log('==admin service:_clientList started==');
        let useTolkin:boolean = true;

        return this.backendService.get(UrlParams.adminClients, useTolkin);

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





}
