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

  constructor(private loginService: LoginService,
              private errorMessageHandlerService: ErrorMessageHandlerService,
              private router: Router) { }


  public EnvoyerEmailFunction(loginInputEmail: string) {
    this.loading = true;
    console.log(loginInputEmail);
    const userEmail = {
        email: loginInputEmail
    };

    this.loginService.passwordRequest(userEmail)
      .subscribe(result => {
          this.successCreating = 'Veuillez vérifier votre email pour les prochaines instructions';
          setTimeout(() => {
            this.router.navigate(['']);  ///login
          }, 4000);
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

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
        this.successCreating = '';
    }

}
