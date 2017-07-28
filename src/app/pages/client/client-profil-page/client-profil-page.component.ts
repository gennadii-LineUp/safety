import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client/client.service';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {ClientClass} from '../../../models/const/client-class';
import {ClientProfileClass} from '../../../models/const/client-profile-class';

@Component({
  selector: 'app-client-profil-page',
  templateUrl: './client-profil-page.component.html',
  styleUrls: ['./client-profil-page.component.css'],
    providers: [ClientService]
})
export class ClientProfilPageComponent implements OnInit {
    loading = true;
    updating = false;
    errorLoad = '';
    successUpdate = '';
    errorUpdate = '';

    loadingFile = false;
    uploadedFile = false;
    content: any;
    showImg = false;

    imgServer: any;

    billingAddressIsDifferent = true;

    file: File;
    userHasChoosenFile = false;

    client = new ClientProfileClass('', '', '', '', '', false, '', '', '', '', '', '', '', '', '', '', '', '');

    constructor(public router: Router,
                public clientService: ClientService,
                public errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit(): void {
        this.getClientProfilData();
    }

    public getClientProfilData(): void {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        this.clientService.getClientProfilData()
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.dir(result);

                    const currentClient = new ClientProfileClass(result.email,
                        result.company,
                        result.address,
                        result.postalCode,
                        result.city,
                        result.billingAddressIfDifferent,
                        result.diffName,
                        result.diffAddress,
                        result.diffPostalCode,
                        result.diffCity,
                        result.phone,
                        result.numberSiret,
                        result.rib,
                        result.contactName,
                        result.contactPhone,
                        result.contactEmail,
                        '', '');
                      this.client = currentClient;

                      this.loadingFile = true;
                      setTimeout(() => {
                          this.getFromServerProfileImageFunction();
                      }, 100);
                }
            }, (err) => {
                this.loading = false;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });
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
            }, 1000);
        }
    }

    public loadToServerProfileImageFunction() {
      this.clientService.loadToServerProfileImage(this.content)
        .subscribe(result => {
          if (result) {
            setTimeout(() => {
                this.getFromServerProfileImageFunction();
            }, 100);
          }
        }, (err) => {
          this.loadingFile = false;
          console.log(err);
          this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
        });
    }

    public getFromServerProfileImageFunction() {
        this.loadingFile = true;
        this.uploadedFile = false;
            this.clientService.getFromServerProfileImage()
                .subscribe(result => {
                    if (result) {
                        this.loadingFile = false;
                        this.showImg = true;
                        const src = 'data:' + result.contentType + ';base64,';
                        this.imgServer = src + result.content;
                    }
                }, (err) => {
                    this.loadingFile = false;
                    console.log(err);
                    this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                });
    }


    public submitNewProfilClientFunction() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.updating = true;

        console.dir(this.client);

        this.clientService.updateClientProfile(this.client)
            .subscribe(result => {
                if (result) {

                    // if (this.userHasChoosenFile) {
                    //     this.loadingFile = true;
                    //     this.clientService.loadToServerProfileImage(this.file)
                    //         .subscribe(result => {
                    //             if (result) {
                    //                 this.loadingFile = false;
                    //                 this.uploadedFile = true;
                    //                 console.log(result);
                                     this.successUpdate = 'Le profil a bien été mis à jour.';
                    //             }
                    //         }, (err) => {
                    //             this.loadingFile = false;
                    //             console.log(err);
                    //             this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                    //         });
                    // }
                    // else {
                    //     this.successUpdate = "Well done! You've updated your settings.";
                    // }
                    this.updating = false;
                    this.userHasChoosenFile = false;
                    // this.ngOnInit();
                }
            }, (err) => {
                this.updating = false;
                console.log(err);
                this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
            });

    }

    public gotoClientHomePage() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/client']);
    }

  public cancellErrorMessage() {
      this.loading = false;
      this.updating = true;
      this.errorUpdate = '';
      this.errorLoad = '';
    }
    public cancellSuccessMessage() {
      this.updating = false;
      this.successUpdate = '';
    }


  public toggleDifferentBillingAddress(checkbox) {
        this.billingAddressIsDifferent = !checkbox.target.checked;
    }

}
