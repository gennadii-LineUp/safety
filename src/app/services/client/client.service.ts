import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';

@Injectable()
export class ClientService {
    public token: string;

    constructor(private backendService: BackendService) {
        this.token = localStorage.token;
    }

    getClientProfilData(): Observable<any> {
        console.log('==client service started==');
        let useTolkin:boolean = false;

        return this.backendService.get(UrlParams.clientProfilData, useTolkin);

    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }





}
