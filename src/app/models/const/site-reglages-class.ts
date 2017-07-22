export class SiteReglagesClass {
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
  signatoryName: string;
  signatorySurname: string;

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
              techControlSite: boolean,
              signatoryName: string,
              signatorySurname: string) {

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
    this.signatoryName = signatoryName;
    this.signatorySurname = signatorySurname;
  }
}
