export class UrlParams {

    public static get LOGIN(): string {
        return `http://sfapi:8000/app_dev.php/login`;
      //  return `http://82.117.251.13/api/login`;
      //  return `http://api.lab.sygma-online.fr/login`;
    }

    public static get adminClients(): string {
        return `http://sfapi:8000/app_dev.php/admin/clients`;
        // return `http://82.117.251.13/api/admin/clients`;
        //  return `http://api.lab.sygma-online.fr/admin/clients`;
    }

    public static get adminClientHome(): string {
        return `http://sfapi:8000/app_dev.php/admin/clients/`;
        // return `http://82.117.251.13/api/admin/clients/`;
        //  return `http://api.lab.sygma-online.fr/admin/clients/`;
    }

    public static get adminReglages(): string {
        return `http://sfapi:8000/app_dev.php/admin/settings`;
        // return `http://82.117.251.13/api/admin/settings`;
        //  return `http://api.lab.sygma-online.fr/admin/settings`;
    }

    public static get monCompteFormationLink(): string {
      return `http://sfapi:8000/app_dev.php/mon_compte_formation_link`;
      // return `http://82.117.251.13/api/mon_compte_formation_link`;
      //  return `http://api.lab.sygma-online.fr/mon_compte_formation_link`;
    }

    public static get adminHome(): string {
        return `http://sfapi:8000/app_dev.php/admin/home`;
      //  return `http://82.117.251.13/api/admin/home`;
      //  return `http://api.lab.sygma-online.fr/admin/home`;
    }

    public static get adminLink(): string {
        return `http://sfapi:8000/app_dev.php/library_links`;
        //  return `http://82.117.251.13/api/library_links`;
        //  return `http://api.lab.sygma-online.fr/library_links`;
    }


    public static get clientSites(): string {
        return `http://sfapi:8000/app_dev.php/sites`;
      //  return `http://82.117.251.13/api/sites`;
      //  return `http://api.lab.sygma-online.fr/sites`;
    }

    public static get employeesGroupsList(): string {
        return `http://sfapi:8000/app_dev.php/client/employees-groups-list`;
        //  return `http://82.117.251.13/api/client/employees-groups-list`;
        //  return `http://api.lab.sygma-online.fr/client/employees-groups-list`;
    }

    public static get clientGroupes(): string {
        return `http://sfapi:8000/app_dev.php/client/employees-groups`;
      //  return `http://82.117.251.13/api/client/employees-groups`;
      //  return `http://api.lab.sygma-online.fr/client/employees-groups`;
    }

    public static get clientEmployees(): string {
        return `http://sfapi:8000/app_dev.php/client/employees`;
        //   return `http://82.117.251.13/api/client/employees`;
        //  return `http://api.lab.sygma-online.fr/client/employees`;
    }

    public static get employeeCount(): string {
        return `http://sfapi:8000/app_dev.php/client/employee_count`;
        //   return `http://82.117.251.13/api/client/employee_count`;
        //  return `http://api.lab.sygma-online.fr/client/employee_count`;
    }

    public static get clientProfilData(): string {
        return `http://sfapi:8000/app_dev.php/client/profile`;
       // return `http://82.117.251.13/api/client/profile`;
       //  return `http://api.lab.sygma-online.fr/client/profile`;
    }

    public static get siteHome(): string {
        return `http://sfapi:8000/app_dev.php/sites/`;
        // return `http://82.117.251.13/api/sites/`;
        //  return `http://api.lab.sygma-online.fr/sites/`;
    }

    public static get employeeHome(): string {
      return `http://sfapi:8000/app_dev.php/employee/`;
      // return `http://82.117.251.13/api/employee/`;
      //  return `http://api.lab.sygma-online.fr/employee/`;
    }


}
