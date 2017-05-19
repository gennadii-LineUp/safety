import { Injectable } from '@angular/core';
import {Response, RequestOptions, Http, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';

@Injectable()
export class BackendService {

    constructor(private http: Http) { }

    public login(url, body, usernamePassword) : Observable<any>  {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Basic ' + usernamePassword);

        return this.http.post(url, body, {headers: headers})
            .map((res: Response) => <Object[]>res.json());
    }


  public get(url: string, addToken = false, contentType: string = CONTENT_TYPE.JSON): Observable<any> {
    let headers = new Headers({ 'Content-Type': contentType }),
        options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(url: string, id: string, addToken: boolean = false, contentType: string = CONTENT_TYPE.JSON): Observable<any> {
    let headers = new Headers({ 'Content-Type': contentType, 'OrganizationId': id }),
        options = new RequestOptions({ headers: headers });

    if (this.addToken) {
      this.addToken(headers);
    }

    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
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

  // public post(query: string, body: any, token: boolean = false, contentType: string = CONTENT_TYPE.JSON_TYPE): Observable<{}> {
  //   let headers: Headers = new Headers();
  //
  //   this.composeHeaders(headers, contentType);
  //
  //   if (token) {
  //     this.addToken(headers);
  //   }
  //
  //   if (contentType === CONTENT_TYPE.JSON_TYPE) {
  //     body = JSON.stringify(body);
  //   }
  //
  //   return this.http.post(query, body, {headers: headers})
  //     .map((res: Response) => <Object[]>res.json())
  //     // .catch((err: Response) => this.errorHandler.handleError(err));
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

  private composeHeaders (headers: Headers, type: string): void {
    let content: string = type.toUpperCase();
    headers.append('Content-Type', CONTENT_TYPE[content]);
  }

  private addToken(headers: Headers): void {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

}
