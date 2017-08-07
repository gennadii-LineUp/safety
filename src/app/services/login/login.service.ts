import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Router} from '@angular/router';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {ResetPasswordClass} from '../../models/const/reset-password-class';

@Injectable()
export class LoginService {

    constructor(public backendService: BackendService,
                public router: Router) {}

    login(user: string, password: string): Observable<any> {
        this.logout();
        let usernamePassword = btoa(user + ':' + password);

        return this.backendService.login(UrlParams.LOGIN, 'LineUp', usernamePassword);
    }

    resetPassword(newPassword: ResetPasswordClass): Observable<any> {
      return this.backendService.resetPassword(UrlParams.resetPassword, JSON.stringify(newPassword));
    }
    passwordRequest(userEmail: any): Observable<any> {
      return this.backendService.resetPassword(UrlParams.resetPassword + '_request', JSON.stringify(userEmail));
    }


    public afterSuccessLogin(result: any) {
      localStorage.setItem('role', result.roles);
      localStorage.setItem('token', result.token);
      localStorage.setItem('refresh_token', result.refresh_token);
      if (result.employeeAccess) {
        localStorage.setItem('employeeAccess', result.employeeAccess);
        localStorage.setItem('id_site', result.employeeSiteId);
      }
      console.log('true, ' + localStorage.role);
      if (localStorage.role === 'ROLE_ADMIN') {this.router.navigate(['/admin']); }
      if (localStorage.role === 'ROLE_CLIENT') {this.router.navigate(['/client']); }
      if (localStorage.role === 'ROLE_EMPLOYEE') {this.router.navigate(['/sfsalarie']); }
    }


  logout(): void {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }

}
