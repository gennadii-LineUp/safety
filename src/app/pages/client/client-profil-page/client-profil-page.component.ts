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
    uploadFileText: string = 'Image du site';

    billingAddressIsDifferent: boolean = true;

    client = new ClientProfileClass('','','','','',true,'','','','','','','','','','','','');
    //ClientProfileClass
    constructor(private router: Router,
                private clientService: ClientService,
                private errorMessageHandlerService: ErrorMessageHandlerService){}

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

                    let currentClient = new ClientProfileClass(result.email,
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
                    // console.dir(this.client);
                    this.loadingFile = true;
                    this.clientService.getProfileImage()
                        .subscribe(result => {
                            if (result) {
                                this.loadingFile = false;
                                console.log(result);
                                // this.successUpdate = "Well done! You've updated your settings.";
                            }
                        }, (err) => {
                            this.loadingFile = false;
                            this.uploadFileText = '  error  error  error';
                            console.log(err);
                            this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                        });

                }
            }, (err) => {
                console.log('====error=============');
                this.loading = false;
                this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
            });

    }


    private cancellErrorMessage() {
        this.loading = false;
        this.updating = true;
        this.errorUpdate = '';
        this.errorLoad = '';
    }
    public cancellSuccessMessage() {
        this.updating = false;
        //this.successCreating = '';
    }

    file: File;
    userHasChoosenFile: boolean = false;
    public fileChange(event) {
        // this.loadingFile = true;
        this.uploadedFile = false;
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            this.userHasChoosenFile = true;
            this.file = fileList[0];
            this.uploadFileText = this.file.name;

            if (this.userHasChoosenFile) {
                this.loadingFile = true;
                this.clientService.uploadProfileImage(this.file)
                    .subscribe(result => {
                        if (result) {
                            console.log(result);

                            setTimeout(() => {
                                this.clientService.getProfileImage()
                                    .subscribe(result => {
                                        if (result) {
                                            this.loadingFile = false;
                                            this.uploadedFile = true;
                                            console.log(result);
                                            // this.successUpdate = "Well done! You've updated your settings.";
                                        }
                                    }, (err) => {
                                        this.loadingFile = false;
                                        this.uploadFileText = '  error  error  error';
                                        console.log(err);
                                        this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                                    });
                            }, 1000);


                            // this.successUpdate = "Well done! You've updated your settings.";
                        }
                    }, (err) => {
                        this.loadingFile = false;
                        this.uploadFileText = '  error  error  error';
                        console.log(err);
                        this.errorUpdate = this.errorMessageHandlerService.checkErrorStatus(err);
                    });
            }
            else {
                // this.successUpdate = "Well done! You've updated your settings.";
            }

        }
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
                    //     this.clientService.uploadProfileImage(this.file)
                    //         .subscribe(result => {
                    //             if (result) {
                    //                 this.loadingFile = false;
                    //                 this.uploadedFile = true;
                    //                 console.log(result);
                                     this.successUpdate = "Well done! You've updated your settings.";
                    //             }
                    //         }, (err) => {
                    //             this.loadingFile = false;
                    //             this.uploadFileText = '  error  error  error';
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

    public toggleDifferentBillingAddress(checkbox) {
        this.billingAddressIsDifferent = !checkbox.target.checked;
    }

}
