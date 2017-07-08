export class ClientProfileClass {
    email: string;
    company: string;
    address: string;
    postalCode: string;
    city: string;
    billingAddressIfDifferent: boolean;
    diffName: string;
    diffAddress: string;
    diffPostalCode: string;
    diffCity: string;
    phone: string;
    numberSiret: string;
    rib: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    password: string;
    confirmPassword: string;

    constructor( email: string,
                 company: string,
                 address: string,
                 postalCode: string,
                 city: string,
                 billingAddressIfDifferent: boolean,
                 diffName: string = '',
                 diffAddress: string = '',
                 diffPostalCode: string = '',
                 diffCity: string = '',
                 phone: string,
                 numberSiret: string,
                 rib: string,
                 contactName: string,
                 contactPhone: string,
                 contactEmail: string,
                 password: string,
                 confirmPassword: string) {

        this.email = email;
        this.company = company;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.billingAddressIfDifferent = billingAddressIfDifferent;
        this.diffName = diffName;
        this.diffAddress = diffAddress;
        this.diffPostalCode = diffPostalCode;
        this.diffCity = diffCity;
        this.phone = phone;
        this.numberSiret = numberSiret;
        this.rib = rib;
        this.contactName = contactName;
        this.contactPhone = contactPhone;
        this.contactEmail = contactEmail;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
