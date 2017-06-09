export class UrlParams {

    public static get LOGIN(): string {
        return `http://sfapi:8000/app_dev.php/login`;
      //  return `http://82.117.251.13/api/login`;
    }

    public static get adminClients(): string {
        return `http://sfapi:8000/app_dev.php/admin/clients`;
        //return `http://82.117.251.13/api/admin/clients`;
    }

    public static get adminHome(): string {
        return `http://sfapi:8000/app_dev.php/admin/home`;
      //  return `http://82.117.251.13/api/admin/home`;
    }

    public static get clientSites(): string {
        return `http://sfapi:8000/app_dev.php/client/sites`;
      //  return `http://82.117.251.13/api/client/sites`;
    }

    public static get clientGroupes(): string {
        return `http://sfapi:8000/app_dev.php/client/employees-groups`;
      //  return `http://82.117.251.13/api/client/employees-groups`;
    }

    public static get clientProfilData(): string {
        return `http://sfapi:8000/app_dev.php/client/profile`;
       // return `http://82.117.251.13/api/client/profile`;
    }



}

