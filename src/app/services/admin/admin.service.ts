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


    login(user: string, password: string): Observable<any> {
        this.logout();

        let usernamePassword = btoa(user+':'+password);
        console.log('====');

        return this.backendService.login(UrlParams.LOGIN, "HELLO", usernamePassword);

    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }





}
