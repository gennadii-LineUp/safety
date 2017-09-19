export class UrlParams {

  private static baseUrl = 'http://sfapi:8000/app_dev.php/';
  // private static baseUrl = 'http://82.117.251.13/api/';
  // private static baseUrl = 'http://api.lab.sygma-online.fr/';
  // private static baseUrl = 'https://api.sygma-online.fr/';

  public static get homeUrl(): string {
    return UrlParams.baseUrl;
  }
  public static get LOGIN(): string {
    return UrlParams.baseUrl + `login`;
  }
  public static get resetPassword(): string {
    return UrlParams.baseUrl + `reset_password`;
  }

  public static get adminClients(): string {
    return UrlParams.baseUrl + `admin/clients`;
  }

  public static get adminClientHome(): string {
    return UrlParams.baseUrl + `admin/clients/`;
  }

  public static get adminReglages(): string {
    return UrlParams.baseUrl + `admin/settings`;
  }

  public static get monCompteFormationLink(): string {
    return UrlParams.baseUrl + `mon_compte_formation_link`;
  }

  public static get adminHome(): string {
    return UrlParams.baseUrl + `admin/home`;
  }

  public static get adminLink(): string {
    return UrlParams.baseUrl + `library_links`;
  }


  public static get clientSites(): string {
    return UrlParams.baseUrl + `sites`;
  }

  public static get employeesGroupsList(): string {
    return UrlParams.baseUrl + `client/employees-groups-list`;
  }

  public static get clientGroupes(): string {
    return UrlParams.baseUrl + `client/employees-groups`;
  }

  public static get clientEmployees(): string {
    return UrlParams.baseUrl + `client/employees`;
  }

  public static get employeeCount(): string {
    return UrlParams.baseUrl + `client/employee_count`;
  }

  public static get clientProfilData(): string {
    return UrlParams.baseUrl + `client/profile`;
  }

  public static get siteHome(): string {
    return UrlParams.baseUrl + `sites/`;
  }

  public static get employeeHome(): string {
    return UrlParams.baseUrl + `employee/`;
  }
  public static get tokRefresh(): string {
    return UrlParams.baseUrl + `token/refresh`;
  }

}
