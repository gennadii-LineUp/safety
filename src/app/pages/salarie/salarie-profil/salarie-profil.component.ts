import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';
import {EmployeesClass} from '../../../models/const/employees-class';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {EmployeesPasswordClass} from '../../../models/const/employee-psw-class';
import {SiteService} from '../../../services/site/site.service';

@Component({
  selector: 'salarie-profil',
  templateUrl: './salarie-profil.component.html',
  styleUrls: ['./salarie-profil.component.css'],
  providers: [SalariesService, SiteService]
})
export class SalarieProfilComponent implements OnInit, OnDestroy {
  loading = true;
  updating = false;
  successUpdate = '';
  errorLoad = '';

  loadingFile = false;
  uploadedFile = false;
  content: any;
  showImg = false;
  file: File;
  userHasChoosenFile = false;
  imgServer: any;


  employee = new EmployeesClass('', '', '', '', '', '', false, '', '', 0);
  employeesPasswordClass = new EmployeesPasswordClass('', '', '');

    constructor(public salariesService: SalariesService,
                public errorMessageHandlerService: ErrorMessageHandlerService) { }

    ngOnInit() {
      this.loading = true;
      window.document.querySelectorAll('#monProfil')['0'].classList.add('active');
      this.getFromServerProfileImageFunction();
    }
    ngOnDestroy() {
        window.document.querySelectorAll('#monProfil')['0'].classList.remove('active');
    }


  public getProfileDataFunction() {
    this.loading = true;
    this.salariesService.getProfilData()
      .subscribe(result => {
          this.loading = false;
          console.log(result);
          this.employee.name = result.name;
          this.employee.surname = result.surname;
          this.employee.email = result.email;
          this.employee.post = result.post;
          this.employee.birthDate = result.birthDate;
          this.employee.numSecu = result.numSecu;
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
          console.log(result);
          this.successUpdate = 'Le profil a bien été mis à jour.';
          this.updating = false;
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

  public fileChange(event) {
    this.uploadedFile = false;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.userHasChoosenFile = true;
      this.file = fileList[0];

      let reader = new FileReader();
      reader.onload = (e) => {
        this.content = e.target;
      };
      const res = reader.readAsDataURL(event.target.files[0]);

      this.loadingFile = true;
      setTimeout(() => {
        this.loadToServerProfileImageFunction();
      }, 2000);
    }
  }

  public loadToServerProfileImageFunction() {
    this.salariesService.loadToServerSalarieeImage(this.content)
      .subscribe(result => {
        console.log(result);
          setTimeout(() => {
            this.getFromServerProfileImageFunction();
          }, 100);
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  public getFromServerProfileImageFunction() {
    this.loadingFile = true;
    this.uploadedFile = false;
    this.salariesService.getFromServerSalarieeImage()
      .subscribe(result => {
          this.loadingFile = false;
          this.showImg = true;
          const src = 'data:' + result.contentType + ';base64,';
          this.imgServer = src + result.content;
          this.getProfileDataFunction();
      }, (err) => {
        this.loadingFile = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }


}
