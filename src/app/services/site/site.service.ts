import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';

//import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SiteService {
    public id_site: number;


    constructor(private backendService: BackendService) {}


    public setIdSite(id_site: number) {
        this.id_site = id_site;
        console.log('setted ' + this.id_site);
    }
    public getIdSite():number {
        console.log('getting... ' + this.id_site);
        return this.id_site;
    }


    public homeData(): Observable<any> {
        //console.log('==admin service:_homeData started==');
        return this.backendService.get(UrlParams.adminHome);

    }


    public clientList(page): Observable<any> {
        //console.log('==admin service:_clientList started==');
        let query = '?q=&sort=&page=';
        return this.backendService.get(UrlParams.adminClients + query + page);
    }

    public findEmployeeByName(name: string, page: any, sideId: number): Observable<any> {
        let query = '?q=' + name + '&sort=' + page;
        return this.backendService.get(UrlParams.siteHome+sideId+'/employees' + query);
    }


    public addNewEmployee(newEmployee: any, sideId: number): Observable<any> {
        return this.backendService.post(UrlParams.siteHome+sideId+'/employees', JSON.stringify(newEmployee));
    }


    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


    encode(obj) {
        let newData = '';
        for (let key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        console.log(newData);
        return newData;
    }

    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll("th"),
            tablerows = document.querySelectorAll("th"),
            tablebody = document.querySelector("tbody");
        if (document.querySelector("table")) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/,""));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                }
            }
        }
    }

}
