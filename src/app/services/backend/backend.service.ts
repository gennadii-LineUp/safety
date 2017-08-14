import { Injectable } from '@angular/core';
import {Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';
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
                console.log('=========== image ===========');
                if (res.headers.get('Content-Type').startsWith('image/')) {
                    // if (res.encoded===1) {
                    //   console.log('res.encoded===1, continue!');
                    // }
                    return res;
                }
                return <Object[]>res.json();
            });
    }

  public token_refresh(body: any): Observable<any> {
    console.log('token_refresh()  started');
    const headers: Headers = new Headers();
    const refresh_token = localStorage.getItem('refresh_token');
    const url = UrlParams.tokRefresh;

    // headers.append('refresh_token', refresh_token);
    return this.http.post(url, body, {headers: headers})
      .map((res: Response) => <Object[]>res.json());
    // .catch((err: Response) => this.errorHandler.handleError(err));
  }

  public _token_refresh(): Observable<any> {
    console.log('token_refresh()  started');
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
      console.log(33333333333);
    const headers: Headers = new Headers();
    this.token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + this.token);
    return this.http.get(url, {headers: headers})
      .map((res: Response) => <Object[]>res.json())
      .catch((err) => {
        if (err.status === 401) {
          console.log(err);
          console.log('relogin----');
          this._token_refresh()
            .subscribe(result => {
              console.log(result);
              if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('refresh_token', result.refresh_token);
                console.log('*** token resetted ***');

                const headers1: Headers = new Headers();
                this.token = localStorage.getItem('token');
                headers1.append('Authorization', 'Bearer ' + this.token);
                console.log(url);
                console.log(headers1);
                return this.http.get(url, {headers: headers1})
                  .map((res: Response) => <Object[]>res.json())
                  .subscribe(data => console.log(data));
              }
            }, (err) => {
              console.log(err.json());
              return <Object[]>err.json();
            });
        }
        //  setTimeout(() => {
        //    return <Object[]>err.json();
        // }, 2000);
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



    // public post(url: string,
    //             body: any,
    //             contentType: string = CONTENT_TYPE.JSON_TYPE) : Observable<any> {
    //
    //     let headers: Headers = new Headers();
    //
    //     this.composeHeaders(headers, contentType);
    //
    //     if (token) {
    //         this.addToken(headers);
    //     }
    //
    //     if (contentType === CONTENT_TYPE.JSON_TYPE) {
    //         body = JSON.stringify(body);
    //     }
    //
    //     return this.http.post(url, body, {headers: headers})
    //         .map((res: Response) => <Object[]>res.json());
    //         // .catch((err: Response) => this.errorHandler.handleError(err));
    // }



  // public delete(url: string, id: string, addToken: boolean = false, contentType: string = CONTENT_TYPE.JSON): Observable<any> {
  //   let headers = new Headers({ 'Content-Type': contentType, 'OrganizationId': id }),
  //       options = new RequestOptions({ headers: headers });
  //
  //   if (this.addToken) {
  //     this.addToken(headers);
  //   }
  //
  //   return this.http.delete(url, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  public extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  public handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err: any = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  // public get(query: string): Observable<{}> {
  //   let
  //     headers: Headers = new Headers();
  //
  //   // this.addToken(headers);
  //
  //   return this.http.get(query, {headers: headers})
  //     .cache()
  //     .map((res: Response) => <Object[]>res.json())
  //     .catch((err: Response) => console.log(err);
  // }

  // public put(query: string, body: any, contentType: string = CONTENT_TYPE.TEXT_TYPE): Observable<{}> {
  //   let
  //     headers: Headers = new Headers();
  //
  //   this.composeHeaders(headers, contentType);
  //
  //   return this.http.put(query, body, {headers: headers})
  //     .map((res: Response) => <Object[]>res.json())
  //     .catch((err: Response) => this.errorHandler.handleError(err));
  // }


  //
  // public delete(query: string): Observable<any> {
  //   let headers: Headers = new Headers();
  //   this.addToken(headers);
  //
  //   return this.http.delete(query, {headers: headers})
  //     // .catch((err: Response) => this.errorHandler.handleError(err));
  // }
  //

  public composeHeaders (headers: Headers, type: string): void {
    const content: string = type.toUpperCase();
    headers.append('Content-Type', CONTENT_TYPE[content]);
  }

  public addToken(headers: Headers): void {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

}
