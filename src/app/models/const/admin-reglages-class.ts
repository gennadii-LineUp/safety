export class AdminReglagesClass {
    monCompteFormationLink: string;
    notificationEmails: string;
    password: string;
    confirmPassword: string;
    email: string;

    constructor(monCompteFormationLink: string,
                notificationEmails: string,
                password: string,
                confirmPassword: string,
                email: string) {

        this.monCompteFormationLink = monCompteFormationLink;
        this.notificationEmails = notificationEmails;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.email = email;
    }
}
