import { Injectable } from '@angular/core';


@Injectable()
export class ErrorMessageHandlerService {
    message: string = '';

    constructor() {   }

    public successHandler(successObject: any) {
        this.message = '';

        for (let key in successObject) {

        }
        return true;
    }


    public checkErrorStatus(err: any):any {
        if (err.status === 401) return "please relogin!";
        if (err.status === 403) return "wrong UrlParams, ask Alexander";
        if (err.status === 500) return "problems with connection to server... verify your internet!";
        if (err.status === 0) return "problems with connection to server... verify your internet!";
        return false;
    }


    public errorHandler(errorObject: any):string {
        this.message = '';
        for (let key in errorObject) {
            let status: string = '';
            let _key = this.getKeyEquivalent(key);

            try {
                status = errorObject[key];
                this.message += _key
                                +' - '
                                + status[0].toLowerCase()
                                + status.substring(1).slice(0,-1)
                                + ';  ';
            } catch (e) {
                try {
                    for (let i in errorObject[key]) {
                        let _status = errorObject[key][i];
                        this.message += _key
                            +' - "'
                            + i
                            +'": '
                            + _status[0].toLowerCase()
                            + _status.substring(1).slice(0,-1)
                            + ';  ';
                    }
                } catch (er) {
                    this.message += _key +' - '+ 'this value is not valid;  ';
                }
            }
        }
        return (this.message).slice(0, -2);
    }


    public getKeyEquivalent(key: string) {
        switch (key) {
            case 'company':                   key='*Entreprise*';  break;
            case 'address':                   key='*Adresse*';  break;
            case 'postalCode':                key='*Code postal*';  break;
            case 'city':                      key='*Ville*';  break;
            case 'billingAddressIfDifferent': key='*Adresse de facturation si différente*';  break;
            case 'diffName':                  key="*Nom, si l'adresse de facturation est différente*";  break;
            case 'diffAddress':               key="*Adresse, si l'adresse de facturation est différente*";  break;
            case 'diffPostalCode':            key="*Code postal, si l'adresse de facturation est différente*";  break;
            case 'diffCity':                  key="*Ville, si l'adresse de facturation est différente*";  break;
            case 'email':                     key='*Email*';  break;
            case 'phone':                     key='*Téléphone*';  break;
            case 'numberSiret':               key='*Numéro SIRET*';  break;
            case 'contactName':               key='*Nom du contact*';  break;
            case 'contactPhone':              key='*Téléphone du contact*';  break;
            case 'contactEmail':              key='*Email du contact*';  break;
            case 'employeesLimit':            key='*Nombre limite de salariés*';  break;
            case 'Expired JWT Token':         key='Relogin SVP. Votre Token a expiré.';  break;
            case 'name':                      key='*Nom*';  break;
            case 'notificationEmails':        key='*Email(s) de notification du site*';  break;
            case 'cacesSiege':                key='*Caces Siège*';  break;
            case 'cacesSite':                 key='*Caces Site*';  break;
            case 'medicalVisitSiege':         key='*Visite médicale - Siège*';  break;
            case 'medicalVisitSite':          key='*Visite médicale - Site*';  break;
            case 'techControlSiege':          key='*Contrôle technique et VGP - Siège*';  break;
            case 'techControlSite':           key='*Contrôle technique et VGP - Site*';  break;
            case 'post':                      key='*Poste*';  break;
            case 'birthDate':                 key='*Date de naissance*';  break;
            case 'numSecu':                   key='*N° sécu*';  break;
            case 'validityPeriod':            key='*Période de validité*';  break;
            case 'startDate':                 key='*Date de début*';  break;
            case 'endDate':                   key='*Date de fin*';  break;
            case 'employeeGroup':             key='*Groupe de salariés*';  break;
            //case '':         key='';  break;
            default:
                key;


        }
        return key;
    }


}
