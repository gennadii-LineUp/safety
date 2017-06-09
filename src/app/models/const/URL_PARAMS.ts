export class UrlParams {

    public static get LOGIN(): string {
        return `http://82.117.251.13/api/login`;
        // return `http://sfapi:8000/app_dev.php/login`;

    }

    public static get adminClients(): string {
        return `http://82.117.251.13/api/admin/clients`;
        // return `http://sfapi:8000/app_dev.php/admin/clients`;

    }

    public static get adminHome(): string {
        return `http://82.117.251.13/api/admin/home`;
        //  return `http://sfapi:8000/app_dev.php/admin/home`;

    }

    public static get clientSites(): string {
        return `http://82.117.251.13/api/client/sites`;
        // return `http://sfapi:8000/app_dev.php/client/sites`;

    }

    public static get clientGroupes(): string {
        return `http://82.117.251.13/api/client/employees-groups`;
        // return `http://sfapi:8000/app_dev.php/client/employees-groups`;

    }

    public static get clientProfilData(): string {
        return `http://82.117.251.13/api/client/profile`;
        // return `http://sfapi:8000/app_dev.php/client/profile`;

    }



}

