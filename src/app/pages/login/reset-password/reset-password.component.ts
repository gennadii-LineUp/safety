import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login/login.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPasswordClass} from '../../../models/const/reset-password-class';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [LoginService, ErrorMessageHandlerService]
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  loading = false;
  errorLoad = '';

  private sub: any; //   /reset/
  private querySubscription: Subscription;  //    ?reset/
  private reset_token = '';

  newPassword = new ResetPasswordClass('', '', '');

  constructor(private route: ActivatedRoute,
              private loginService: LoginService,
              private errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.reset_token = params['reset'];
    });
    // this.querySubscription = this.route.queryParams.subscribe(
    //   (queryParam: any) => {
    //     this.reset_token = queryParam['reset'];
    // });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.querySubscription.unsubscribe();
  }

  public resetPasswordFunction () {
    this.cancellErrorMessage();
    this.loading = true;
    this.newPassword.token = this.reset_token;

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
        this.errorLoad = '55555';
          this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  private cancellErrorMessage() {
    this.loading = false;
    this.errorLoad = '';
  }

}
