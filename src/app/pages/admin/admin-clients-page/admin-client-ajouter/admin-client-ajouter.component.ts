import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm} from '@angular/forms';

export class Client{
    constructor(public email: string,
                public company: string,
                public address: string,
                public postalCode: string,
                public city: string,
                public billingAddressIfDifferent: boolean,
                public diffName: string,
                public diffAddress: string,
                public diffPostalCode: string,
                public diffCity: string,
                public phone: number,
                public numberSiret: number,
                public contactName: string,
                public contactPhone: number,
                public contactEmail: string,
                public employeesLimit: number)
    { }
}


@Component({
  selector: 'admin-client-ajouter',
  templateUrl: './admin-client-ajouter.component.html',
  styleUrls: ['./admin-client-ajouter.component.css']
})
export class AdminClientAjouterComponent implements OnInit {
    loading = false;
    error = '';
    billingAddressIsDifferent:boolean = true;

    client: Client[] = [];

    constructor(private router: Router) {}

    ngOnInit() {
        // var spins = document.getElementsByClassName("spin");
        // for (var i = 0, len = spins.length; i < len; i++) {
        //     var spin = spins[i],
        //         span = spin.getElementsByTagName("span"),
        //         input = spin.getElementsByTagName("input")[0];
        //
        //     input.onchange = function() { input.value = +input.value || 0; };
        //     span[1].onclick = function() { input.value = Math.max(0, +input.value - 1); };
        //     span[0].onclick = function() { input.value -= -1; };
        // }

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
        console.log(email, company, address, postalCode, city, billingAddressIfDifferent, diffName, diffAddress, diffPostalCode, diffCity, phone, numberSiret, contactName, contactPhone, contactEmail, employeesLimit);


    }

    public gotoAdminClientForm() {
        this.router.navigate(['/admin/client']);
    }

    public toggleDifferentBillingAddress(checkbox) {
        this.billingAddressIsDifferent = !checkbox.target.checked;
    }

    public increaseEmployees() {
        console.log('+');
    }
    public decreaseEmployees() {
        console.log('-');
    }


}
