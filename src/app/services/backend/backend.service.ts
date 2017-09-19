import { Injectable } from '@angular/core';
import {Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UrlParams} from '../../models/const/URL_PARAMS';

@Injectable()
export class BackendService {

    public token: string;

    constructor(public http: Http) {}


    public login(url, body, usernamePassword): Observable<any>  {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Basic ' + usernamePassword);

        return this.http.post(url, body, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
    }
    public resetPassword(url: string, body: any): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, body, {headers: headers})
          .map((res: Response) => <Object[]>res.json());
      // .catch((err: Response) => this.errorHandler.handleError(err));
    }


  public post(url: string, body: any): Observable<any> {
        const headers: Headers = new Headers();
        this.token = localStorage.getItem('token');

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, body, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
        // .catch((err: Response) => this.errorHandler.handleError(err));
    }


    public loadImage_post(url: string, body: any): Observable<any> {
        const headers: Headers = new Headers();
        this.token = localStorage.getItem('token');

        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, body, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
    }

  public sendPDFtoServer(url: string, body: any): Observable<any> {
    const headers: Headers = new Headers();
    this.token = localStorage.getItem('token');

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer ' + this.token);
   // headers.append('Accept', 'application/json');

    return this.http.post(url, body, {headers: headers})
      .map((res: Response) => <Object[]>res.json());
  }


  public loadImage_get(url: string): Observable<any> {
        const headers: Headers = new Headers();
        this.token = localStorage.getItem('token');

        headers.append('Authorization', 'Bearer ' + this.token);
        headers.append('Content-Type', 'image/jpeg');

        return this.http.get(url, {headers: headers})
            .map((res: Response) => {
                if (res.headers.get('Content-Type').startsWith('image/')) {
                    return res;
                }
                return <Object[]>res.json();
            });
    }

  public token_refresh(body: any): Observable<any> {
    const headers: Headers = new Headers();
    const refresh_token = localStorage.getItem('refresh_token');
    const url = UrlParams.tokRefresh;

    // headers.append('refresh_token', refresh_token);
    return this.http.post(url, body, {headers: headers})
      .map((res: Response) => <Object[]>res.json());
    // .catch((err: Response) => this.errorHandler.handleError(err));
  }

  public _token_refresh(): Observable<any> {
    const headers: Headers = new Headers();
    const refresh_token = localStorage.getItem('refresh_token');
    const url = UrlParams.tokRefresh;
    const refresh = {
      refresh_token: localStorage.getItem('refresh_token')
    };
    return this.http.post(url, refresh, {headers: headers})
      .map((res: Response) => <Object[]>res.json());
    // .catch((err: Response) => this.errorHandler.handleError(err));
  }


  public _get(url: string): Observable<any> {
    const headers: Headers = new Headers();
    this.token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(url, {headers: headers})
      .map((res: Response) => <Object[]>res.json())
      .catch((err) => {
        if (err.status === 401) {
          console.log(err);
          this._token_refresh()
            .subscribe(result => {
              if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('refresh_token', result.refresh_token);
                const headers1: Headers = new Headers();
                this.token = localStorage.getItem('token');
                headers1.append('Authorization', 'Bearer ' + this.token);
                return this.http.get(url, {headers: headers1})
                  .map((res: Response) => <Object[]>res.json())
              }
            }, (err) => {
              return <Object[]>err.json();
            });
        }
        return <Object[]>err.json();
      });
  }


  public get(url: string): Observable<any> {
        const headers: Headers = new Headers();
        this.token = localStorage.getItem('token');

        headers.append('Authorization', 'Bearer ' + this.token);

        return this.http.get(url, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
            // .catch(this.handleError);
    }
    public getFromUrl(url: string): Observable<any> {
      const headers: Headers = new Headers();
      this.token = localStorage.getItem('token');

      headers.append('Authorization', 'Bearer ' + this.token);

      return this.http.get(url)
        .map((res: Response) => res);
      // .catch(this.handleError);
    }


    public deleteData(url: string): Observable<any> {
        const headers: Headers = new Headers();
        this.token = localStorage.getItem('token');

        headers.append('Authorization', 'Bearer ' + this.token);

        return this.http.delete(url, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
    }


}
