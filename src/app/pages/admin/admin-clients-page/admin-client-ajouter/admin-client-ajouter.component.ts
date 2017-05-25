import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import { Client } from '../../../../models/const/client-class';
import {AdminService} from '../../../../services/admin/admin.service';
import {ErrorMessageHandlerService} from '../../../../services/error/error-message-handler.service';


@Component({
  selector: 'admin-client-ajouter',
  templateUrl: './admin-client-ajouter.component.html',
  styleUrls: ['./admin-client-ajouter.component.css'],
    providers: [AdminService, ErrorMessageHandlerService ]
})
export class AdminClientAjouterComponent implements OnInit {
    loading: boolean = false;
    errorCreating: string = '';
    successCreating: string = '';

    billingAddressIsDifferent:boolean = true;
    spins = document.getElementsByClassName("spin");

    client: Client[] = [];


    constructor(private adminService: AdminService,
                private router: Router,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorCreating = '';
    }
    private cancellSuccessMessage() {
        this.loading = false;
        this.successCreating = '';
    }


    // submitNewClientFunction(email: string,
    //                         company: string,
    //                         address: string,
    //                         postalCode: string,
    //                         city: string,
    //                         billingAddressIfDifferent: boolean,
    //                         diffName: string,
    //                         diffAddress: string,
    //                         diffPostalCode: string,
    //                         diffCity: string,
    //                         phone: number,
    //                         numberSiret: number,
    //                         contactName: string,
    //                         contactPhone: number,
    //                         contactEmail: string,
    //                         employeesLimit: number)
    submitNewClientFunction(newClientForm: NgForm) {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let newClient = new Client(newClientForm.value.email,
                                    newClientForm.value.company,
                                    newClientForm.value.address,
                                    newClientForm.value.postalCode,
                                    newClientForm.value.city,
                                    newClientForm.value.billingAddressIfDifferent,
                                    newClientForm.value.diffName,
                                    newClientForm.value.diffAddress,
                                    newClientForm.value.diffPostalCode,
                                    newClientForm.value.diffCity,
                                    newClientForm.value.phone,
                                    newClientForm.value.numberSiret,
                                    newClientForm.value.contactName,
                                    newClientForm.value.contactPhone,
                                    newClientForm.value.contactEmail,
                                    newClientForm.value.employeesLimit);

        console.dir(newClient);
        // console.log(this.adminService);

        this.adminService.addNewClient(newClient)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log('======result====OK======');
                    console.log(result);
                    this.successCreating = "Well done! You've created a new client.";

                }
            }, (err) => {
                let error = (JSON.parse(err._body)).errors;
                console.log('====error=============');
                console.log(error);

                if (Object.keys(error).length > 0) {
                    this.errorCreating = this.errorMessageHandlerService.errorHandler(error);
                }
                this.loading = false;
            });
    }

    public gotoAdminClientForm() {
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.router.navigate(['/admin/client']);
    }

    public toggleDifferentBillingAddress(checkbox) {
        this.billingAddressIsDifferent = !checkbox.target.checked;
    }

    public increaseEmployees() {
        for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

            input.value = +input.value + 1 + '';
        }
    }

    public decreaseEmployees() {
        for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

            input.value = Math.max(0, +input.value - 1) +'';
        }
    }

    public checkForNegativeNumber() {
        for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

           // if (+input.value < 0)    input.value = '0';
            input.value = Math.max(0, +input.value) + '';
        }
    }


}
