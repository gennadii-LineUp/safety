export class AttestationClass{
    name: string;
    dateIssue: string;
    dateExpires: string;


    constructor(name: string,
                dateIssue: string,
                dateExpires: string) {

        this.name = name;
        this.dateIssue = dateIssue;
        this.dateExpires = dateExpires;
    }
}