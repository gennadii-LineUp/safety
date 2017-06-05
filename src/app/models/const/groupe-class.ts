export class GroupeClass{
    name: string;
    adminAccess: boolean;


    constructor(name: string,
                adminAccess: boolean) {

        this.name = name;
        this.adminAccess = adminAccess;
    }
}