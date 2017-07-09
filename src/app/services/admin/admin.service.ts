import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';
import {Observable} from 'rxjs/Observable';
import {AdminReglagesClass} from '../../models/const/admin-reglages-class';

@Injectable()
export class AdminService {

    constructor(private backendService: BackendService) {}


    public homeData(): Observable<any> {
        return this.backendService.get(UrlParams.adminHome);
    }


    public getExistingReglages(): Observable<any> {
        return this.backendService.get(UrlParams.adminReglages);
    }

    public updateReglages(newReglages: AdminReglagesClass): Observable<any> {
        return this.backendService.post(UrlParams.adminReglages, JSON.stringify(newReglages));
    }


    findClientByName(name: string, page: any, sort: string): Observable<any> {
        const query = '?q=' + name + sort + '&page=' + page;
        return this.backendService.get(UrlParams.adminClients + query);
    }

    addNewClient(newClient: any): Observable<any> {
        return this.backendService.post(UrlParams.adminClients, JSON.stringify(newClient));
    }

    deleteClient(link: string): Observable<any> {
        return this.backendService.deleteData(UrlParams.adminClients + link);
    }


    saveLink(link: any, urlOption: string): Observable<any> {
        return this.backendService.post(UrlParams.adminLink + urlOption, JSON.stringify(link));
    }

    findLinksByName(name: string, page: any, sort: string): Observable<any> {
        const query = '?q=' + name + sort + '&page=' + page;
        return this.backendService.get(UrlParams.adminLink + query);
    }

    deleteLink(link: string): Observable<any> {
        return this.backendService.deleteData(UrlParams.adminLink + link);
    }

    getLinkForUpdate(link: string): Observable<any> {
        return this.backendService.get(UrlParams.adminLink + link);
    }


    getTolkinAdminAsClient(client_id: number): Observable<any> {
        return this.backendService.get(UrlParams.adminClientHome + client_id + '/access_token');
    }


    logout(): void {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }


    encode(obj) {
        let newData = '';
        for (const key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        console.log(newData);
        return newData;
    }


    public tableMobileViewInit() {
        const headertext = [],
            headers = document.querySelectorAll('th'),
            tablerows = document.querySelectorAll('th'),
            tablebody = document.querySelector('tbody');
        if (document.querySelector('table')) {
            for (let i = 0; i < headers.length; i++) {
                const current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/, ''));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute('data-th', headertext[j]);
                }
            }
        }
    }

}
