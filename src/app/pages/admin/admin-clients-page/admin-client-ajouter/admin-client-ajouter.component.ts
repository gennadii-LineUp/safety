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

    client: Client[] = [];

    constructor(private router: Router) {}

    ngOnInit() {  }

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
        //this.router.navigate(['/admin/client']);

    }

}
