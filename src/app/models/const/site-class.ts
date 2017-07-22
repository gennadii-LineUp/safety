export class SiteClass {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    notificationEmails: string;
    cacesSiege: boolean;
    cacesSite: boolean;
    medicalVisitSiege: boolean;
    medicalVisitSite: boolean;
    techControlSiege: boolean;
    techControlSite: boolean;


    constructor(name: string,
                address: string,
                postalCode: string,
                city: string,
                notificationEmails: string,
                cacesSiege: boolean,
                cacesSite: boolean,
                medicalVisitSiege: boolean,
                medicalVisitSite: boolean,
                techControlSiege: boolean,
                techControlSite: boolean) {

        this.name = name;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.notificationEmails = notificationEmails;
        this.cacesSiege = cacesSiege;
        this.cacesSite = cacesSite;
        this.medicalVisitSiege = medicalVisitSiege;
        this.medicalVisitSite = medicalVisitSite;
        this.techControlSiege = techControlSiege;
        this.techControlSite = techControlSite;
    }
}
