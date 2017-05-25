import { Injectable } from '@angular/core';


@Injectable()
export class ErrorMessageHandlerService {
    error: string = '';

    constructor() {   }

    public errorHandler(errorObject: any) {
        this.error = '';

        for (let key in errorObject) {

            switch (key) {
                case 'company':
                    key='*Entreprise*';  break;
                case 'address':
                    key='*Adresse*';  break;
                case 'postalCode':
                    key='*Code postal*';  break;
                case 'city':
                    key='*Ville*';  break;
                case 'billingAddressIfDifferent':
                    key='*Adresse de facturation si différente*';  break;
                case 'diffName':
                    key="*Nom, si l'adresse de facturation est différente*";  break;
                case 'diffAddress':
                    key="*Adresse, si l'adresse de facturation est différente*";  break;
                case 'diffPostalCode':
                    key="*Code postal, si l'adresse de facturation est différente*";  break;
                case 'diffCity':
                    key="*Ville, si l'adresse de facturation est différente*";  break;
                case 'email':
                    key='*Email*';  break;
                case 'phone':
                    key='*Téléphone*';  break;
                case 'numberSiret':
                    key='*Numéro SIRET*';  break;
                case 'contactName':
                    key='*Nom du contact*';  break;
                case 'contactPhone':
                    key='*Téléphone du contact*';  break;
                case 'contactEmail':
                    key='*Email du contact*';  break;
                case 'employeesLimit':
                    key='*Nombre limite de salariés*';  break;
                case 'Expired JWT Token':
                    key='Relogin SVP. Votre Token a expiré.';  break;
                default:
                    continue;
            }

            this.error += key +' - '+ errorObject.key + '; ';
        }
        return this.error;
    }

}
