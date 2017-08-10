import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login/login.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'app-login-start',
  templateUrl: './login-start.component.html',
  styleUrls: ['./login-start.component.css'],
    providers: [LoginService, ErrorMessageHandlerService]
})
export class LoginStartComponent implements OnInit {
    loading = false;
    errorLoad = '';

    constructor(public loginService: LoginService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public router: Router) { }

    ngOnInit() {}

    login(userEmail: string, password: string) {
        this.cancellErrorMessage();
        this.loading = true;
        this.loginService.login(userEmail, password)
            .subscribe(result => {
                if (result.token) {
                        this.loginService.afterSuccessLogin(result);
                        this.loading = false;
                }
            }, (err) => {
                this.loading = false;
                if ((err.status === 403) || (err.status === 404)) {
                    this.errorLoad = 'Username or password is incorrect';
                    return;
                }
                const errorStatusKnown = this.errorMessageHandlerService.checkErrorStatus_old(err);
                if (errorStatusKnown) {
                    this.errorLoad = errorStatusKnown;
                    return;
                }
            });
    }

  public cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
