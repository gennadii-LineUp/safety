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
    loading: boolean = true;
    updating: boolean = false;
    errorLoad: string = '';
    successUpdate: string = '';
    errorUpdate: string = '';

    loadingFile: boolean = false;
    uploadedFile: boolean = false;

    imgServer: any;

    billingAddressIsDifferent: boolean = true;

    file: File;
    userHasChoosenFile: boolean = false;

  client = new ClientProfileClass('', '', '', '', '', false, '', '', '', '', '', '', '', '', '', '', '', '');

    constructor(private router: Router,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

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
                        '',
                        result.contactName,
                        result.contactPhone,
                        result.contactEmail,
                        '', '');

                    this.client = currentClient;

                    // this.loadingFile = true;

                    this.getFromServerProfileImageFunction();
                }
            }, (err) => {
                this.loading = false;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });

    }


    public fileChange(event) {
        this.uploadedFile = false;
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];

            if (this.userHasChoosenFile) {
                this.loadingFile = true;
                this.clientService.loadToServerProfileImage(this.file)
                    .subscribe(result => {
                        if (result) {
                            console.log(result);

                            setTimeout(() => {
                                this.getFromServerProfileImageFunction();
                            }, 1000);

                            this.loadingFile = false;
                            this.uploadedFile = true;

                            // this.successUpdate = "Well done! You've updated your settings.";
                        }
                    }, (err) => {
                        this.loadingFile = false;
                        console.log(err);
                        this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                    });
            }
            else {
                // this.successUpdate = "Well done! You've updated your settings.";
            }

        }
    }

    public getFromServerProfileImageFunction() {
        this.loadingFile = true;
        this.uploadedFile = false;
            this.clientService.getFromServerProfileImage()
                .subscribe(result => {
                    if (result) {
                        this.loadingFile = false;
                        console.log(result);
                        // this.imgServer = result._body;
                      // let blob = new Blob([new Uint8Array(result._body)], {
                      //   type: result.headers.get('Content-Type')
                      // });
                      // let urlCreator = window.URL;
                      // let url = urlCreator.createObjectURL(blob);
                      // this.imgServer = url;

                      this.imgServer = atob(result._body);

                      // this.imgServer = atob(String.fromCharCode.apply(null, new Uint8Array(result._body)));
                      // this.successUpdate = "Well done! You've updated your settings.";
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
                    console.log(result);

                    // if (this.userHasChoosenFile) {
                    //     this.loadingFile = true;
                    //     this.clientService.loadToServerProfileImage(this.file)
                    //         .subscribe(result => {
                    //             if (result) {
                    //                 this.loadingFile = false;
                    //                 this.uploadedFile = true;
                    //                 console.log(result);
                                     this.successUpdate = "Well done! You've updated your settings.";
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

    private cancellErrorMessage() {
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
