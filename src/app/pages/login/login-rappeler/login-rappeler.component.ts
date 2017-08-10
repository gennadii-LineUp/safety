import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login/login.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';

@Component({
  selector: 'login-rappeler',
  templateUrl: './login-rappeler.component.html',
  styleUrls: ['./login-rappeler.component.css'],
  providers: [LoginService]
})
export class RappelerLeMotDePasseComponent {
    loading = false;
    errorLoad = '';
    successCreating = '';

  constructor(public loginService: LoginService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public router: Router) { }


  public EnvoyerEmailFunction(loginInputEmail: string) {
    this.loading = true;
    const userEmail = {
        email: loginInputEmail
    };

    this.loginService.passwordRequest(userEmail)
      .subscribe(result => {
          this.loading = false;
          this.successCreating = 'Veuillez vérifier votre email pour les prochaines instructions';
          setTimeout(() => {
            this.router.navigate(['']);  ///login
          }, 10000);
      }, (err) => {
        console.log(err);
        this.loading = false;
        if (err.status === 404) {
          this.errorLoad = "Ce courrier électronique n'existe pas";
          return;
        };
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
        this.successCreating = '';
    }

}
