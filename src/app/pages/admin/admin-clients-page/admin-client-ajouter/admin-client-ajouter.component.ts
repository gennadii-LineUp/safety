import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import { Client } from '../../../../models/const/client-class';
import {BackendService} from '../../../../services/backend/backend.service';
import {AdminService} from '../../../../services/admin/admin.service';


@Component({
  selector: 'admin-client-ajouter',
  templateUrl: './admin-client-ajouter.component.html',
  styleUrls: ['./admin-client-ajouter.component.css'],
    providers: [AdminService]
})
export class AdminClientAjouterComponent implements OnInit {
    loading = false;
    error = '';
    billingAddressIsDifferent:boolean = true;
    spins = document.getElementsByClassName("spin");

    client: Client[] = [];


    constructor(private backendService: BackendService,
                private adminService: AdminService,
                private router: Router) {}

    ngOnInit() {
    }

    private cancellError() {
        this.loading = false;
        this.error = '';
    }

    submitNewClientFunction(email: string,
                            company: string,
                            address: string,
                            postalCode: string,
                            city: string,
                            billingAddressIfDifferent: boolean,
                            diffName: string,
                            diffAddress: string,
                            diffPostalCode: string,
                            diffCity: string,
                            phone: number,
                            numberSiret: number,
                            contactName: string,
                            contactPhone: number,
                            contactEmail: string,
                            employeesLimit: number) {
        this.loading = true;

        let newClient = new Client(email, company, address, postalCode, city, billingAddressIfDifferent, diffName,
                                    diffAddress, diffPostalCode, diffCity, phone, numberSiret, contactName, contactPhone,
                                    contactEmail, employeesLimit);

        console.log(newClient);


    }

    public gotoAdminClientForm() {
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
