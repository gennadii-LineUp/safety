export class UrlParams {

    public static get LOGIN(): string {
    return `http://sfapi:8000/app_dev.php/login`;
    }

    public static get adminClients(): string {
        return `http://sfapi:8000/app_dev.php/admin/clients`;
    }

    public static get adminHome(): string {
        return `http://sfapi:8000/app_dev.php/admin/home`;
    }

    public static get clientSites(): string {
        return `http://sfapi:8000/app_dev.php/client/sites`;
    }

    public static get clientProfilData(): string {
        return `http://sfapi:8000/app_dev.php/client/profile`;
    }



}

