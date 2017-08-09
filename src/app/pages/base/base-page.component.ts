import {BackendService} from '../../services/backend/backend.service';

class BasePageComponent {

  public backendService: BackendService;

  public doRequest($class: object, methodName: string, methodParams: Array<any> | null,
                   successCallback: (result?: any) => void, errorCallback: (err?: any) => void): void {
    $class[methodName].apply($class, methodParams).subscribe(successCallback, (err) => {

      let errorMsg = '';
      try {
        errorMsg = JSON.parse(err._body).error;
      } catch (error) { }

      if (err.status === 401 && (errorMsg === 'Expired JWT Token' || errorMsg === 'User not found. Try to refresh access token')) {
        const refresh = {
          refresh_token: localStorage.getItem('refresh_token')
        };
        this.backendService.token_refresh(refresh).subscribe(result => {
          localStorage.setItem('token', result.token);
          localStorage.setItem('refresh_token', result.refresh_token);

          $class[methodName].apply($class, methodParams).subscribe(successCallback, errorCallback);

        }, errorCallback);

      } else {
        errorCallback(err);
      }
    });
  }
}

export {BasePageComponent};
