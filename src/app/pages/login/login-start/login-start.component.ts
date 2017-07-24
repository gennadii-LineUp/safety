import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login/login.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'login-start',
  templateUrl: './login-start.component.html',
  styleUrls: ['./login-start.component.css'],
    providers: [LoginService, ErrorMessageHandlerService]
})
export class LoginStartComponent implements OnInit {
    loading = false;
    errorLoad = '';

    constructor(private loginService: LoginService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

    ngOnInit() {
        console.log(localStorage);
    }

    login(userEmail: string, password: string) {
        this.cancellErrorMessage();

        this.loading = true;
        this.loginService.login(userEmail, password)
            .subscribe(result => {
                if (result.token) {
                        localStorage.setItem('role', result.roles);
                        localStorage.setItem('token', result.token);
                        if (result.employeeAccess) {
                          localStorage.setItem('employeeAccess', result.employeeAccess);
                          localStorage.setItem('id_site', result.employeeSiteId);
                        }
                        console.log('true, ' + localStorage.role);
                        if (localStorage.role === 'ROLE_ADMIN') {this.router.navigate(['/admin']); }
                        if (localStorage.role === 'ROLE_CLIENT') {this.router.navigate(['/client']); }
                        if (localStorage.role === 'ROLE_EMPLOYEE') {this.router.navigate(['/sfsalarie']); }
                        this.loading = false;
                }
            }, (err) => {
                this.loading = false;
                if ((err.status === 403) || (err.status === 404)) {
                    this.errorLoad = 'Username or password is incorrect';
                    return;
                };

                const errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus_old(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }
            });

    }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }


}
