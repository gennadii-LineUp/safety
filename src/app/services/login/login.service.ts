import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Router} from '@angular/router';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
    public token: string;

    constructor(private backendService: BackendService,
                private router: Router) {
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = localStorage.token;
        console.log(this.token);
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


    //============
    // =================



  encode(obj) {
    let newData = '';
    for (let key in obj) {
      newData += key;
      newData += '=' + encodeURI(obj[key]) + '&';
    }
    newData = newData.slice(0, -1);
    return newData;
  }

}
