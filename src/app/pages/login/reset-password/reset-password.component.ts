import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login/login.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {Router} from '@angular/router';
import {ResetPasswordClass} from '../../../models/const/reset-password-class';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [LoginService, ErrorMessageHandlerService]
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  errorLoad = '';

  newPassword = new ResetPasswordClass('', '', '');

  constructor(private loginService: LoginService,
              private errorMessageHandlerService: ErrorMessageHandlerService,
              private router: Router) { }

  ngOnInit() {
  }

  public resetPasswordFunction () {
    this.cancellErrorMessage();
    this.loading = true;
    this.loginService.resetPassword(this.newPassword)
      .subscribe(result => {
        if (result.token) {
          this.loginService.afterSuccessLogin(result);
          this.loading = false;
        }
      }, (err) => {
        console.log(err);
        this.loading = false;
        // if ((err.status === 403) || (err.status === 404)) {
        //   this.errorLoad = 'Username or password is incorrect';
        //   return;
        // };

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
