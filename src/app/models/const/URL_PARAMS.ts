export class UrlParams {

    public static get LOGIN(): string {
    return `http://sfapi:8000/app_dev.php/login`;
    }

    public static get adminCreateNewClient(): string {
        return `http://sfapi:8000/app_dev.php/admin/clients`;
    }

}
