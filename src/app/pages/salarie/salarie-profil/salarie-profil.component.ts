import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {EmployeesClass} from '../../../models/const/employees-class';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {EmployeesPasswordClass} from '../../../models/const/employee-psw-class';

@Component({
  selector: 'salarie-profil',
  templateUrl: './salarie-profil.component.html',
  styleUrls: ['./salarie-profil.component.css'],
  providers: [SalariesService]
})
export class SalarieProfilComponent implements OnInit, OnDestroy {
  loading = false;
  updating = false;
  successUpdate = '';
  errorLoad = '';
  employee = new EmployeesClass('', '', '', '', '', '', false, '', '', 0);
  employeesPasswordClass = new EmployeesPasswordClass('', '', '');

    constructor(public salariesService: SalariesService,
                public errorMessageHandlerService: ErrorMessageHandlerService) { }

    ngOnInit() {
      window.document.querySelectorAll('#monProfil')['0'].classList.add('active');
      this.getProfileDataFunction();
    }
    ngOnDestroy() {
        window.document.querySelectorAll('#monProfil')['0'].classList.remove('active');
    }


  public getProfileDataFunction() {
    this.loading = true;
    this.salariesService.getProfilData()
      .subscribe(result => {
        if (result) {
          this.loading = false;
          console.log(result);
          this.employee.name = result.name;
          this.employee.surname = result.surname;
          this.employee.email = result.email;
          this.employee.post = result.post;
          this.employee.birthDate = result.birthDate;
          this.employee.numSecu = result.numSecu;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


  public submitFunction() {
    this.cancellMessages();
    this.updating = true;

    const employeesPasswordClass = new EmployeesPasswordClass(this.employee.email,
                                                              this.employeesPasswordClass.password,
                                                              this.employeesPasswordClass.confirmPassword);

    this.salariesService.updateProfilData(employeesPasswordClass)
      .subscribe(result => {
        if (result) {
          console.log(result);
          this.successUpdate = 'Le profil a bien été mis à jour.';
          this.updating = false;
        }
      }, (err) => {
        this.updating = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });

  }

  public cancellMessages() {
    this.loading = false;
    this.updating = true;
    this.errorLoad = '';
    this.successUpdate = '';
  }


}
