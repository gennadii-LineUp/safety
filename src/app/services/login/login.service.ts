import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Router} from '@angular/router';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private backendService: BackendService,
                private router: Router) {}


    login(user: string, password: string): Observable<any> {
        this.logout();
        let usernamePassword = btoa(user + ':' + password);

        return this.backendService.login(UrlParams.LOGIN, 'LineUp', usernamePassword);
    }


    logout(): void {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


}
