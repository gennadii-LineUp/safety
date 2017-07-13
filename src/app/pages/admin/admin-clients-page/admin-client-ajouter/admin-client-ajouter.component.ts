import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import { ClientClass } from '../../../../models/const/client-class';
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

    billingAddressIsDifferent:boolean = true;
    spins = document.getElementsByClassName("spin");

    client = new ClientClass('','','','','',false,'','','','','','','','','',1);
    myForm: NgForm;
    newValue: number = 1;

    constructor(private adminService: AdminService,
                private router: Router,
                private errorMessageHandlerService: ErrorMessageHandlerService) {}

    ngOnInit() {
    }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorCreating = '';
    }
    public cancellSuccessMessage() {
        this.loading = false;
    }


    submitNewClientFunction(newClientForm: NgForm) {
        this.myForm = newClientForm;
        this.cancellErrorMessage();
        this.cancellSuccessMessage();
        this.loading = true;

        let _billingAddressIfDifferent: boolean;
        if (!newClientForm.value.billingAddressIfDifferent) {
            _billingAddressIfDifferent = false;
        } else {
            _billingAddressIfDifferent = newClientForm.value.billingAddressIfDifferent;
        }

        this.client.billingAddressIfDifferent = _billingAddressIfDifferent;
        this.client.employeesLimit = this.newValue;
        console.dir(this.client);

        this.adminService.addNewClient(this.client)
            .subscribe(result => {
                if (result) {
                    this.loading = false;
                    console.log(result);
                    localStorage.setItem('successCreating', 'Bravo! Vous avez créé un nouveau client.');
                    this.gotoAdminClientForm();
                }
            }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorCreating = this.errorMessageHandlerService.checkErrorStatus(err);
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

    public increaseSpinEmployees() {
        for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

            input.value = +input.value + 1 + '';
            this.newValue =+input.value;
        }
    }

    public decreaseSpinEmployees() {
         for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

            input.value = Math.max(0, +input.value - 1) +'';
            this.newValue = +input.value;
        }
    }

    public checkSpinForNegativeNumber() {
        for (let i = 0; i < this.spins.length; i++) {
            let spin = this.spins[i];
            let input = spin.getElementsByTagName("input")[0];

           // if (+input.value < 0)    input.value = '1';
            input.value = Math.max(1, +input.value) + '';
            this.newValue = +input.value
        }
    }


}
