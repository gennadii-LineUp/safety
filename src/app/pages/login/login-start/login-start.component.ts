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
    loading: boolean = false;
    errorLoad: string = '';

    constructor(private loginService: LoginService,
                private errorMessageHandlerService: ErrorMessageHandlerService,
                private router: Router) { }

    ngOnInit() {
    }

    login(userEmail:string, password: string) {
        this.cancellErrorMessage();

        this.loading = true;
        this.loginService.login(userEmail, password)
            .subscribe(result => {
                if (result.token) {
                        localStorage.setItem('role', result.roles);
                        localStorage.setItem('token', result.token);
                         if (localStorage.role === 'ROLE_ADMIN') {this.router.navigate(['/admin']);}
                        if (localStorage.role === 'ROLE_CLIENT') {this.router.navigate(['/client']);}
                        this.loading = false;
                }
            }, (err) => {
                let errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus(err);
                this.loading = false;
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }

                this.errorLoad = 'Username or password is incorrect';
            });

    }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }


}
