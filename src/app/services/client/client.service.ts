import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';
import {SiteClass} from '../../models/const/site-class';

@Injectable()
export class ClientService {

    constructor(public backendService: BackendService) {}


    public getClientProfilData(): Observable<any> {
        return this.backendService.get(UrlParams.clientProfilData);
    }

    public employeeCount(): Observable<any> {
        return this.backendService.get(UrlParams.employeeCount);
    }

    public findSiteByName(name: string, page: any, sort: string): Observable<any> {
        let query = '?q=' + name + sort + '&page=' + page;
        return this.backendService.get(UrlParams.clientSites + query);
    }

    public findSalarieByName(name: string, page: any, sort: string): Observable<any> {
        let query = '?q=' + name + sort + '&page=' + page;

        return this.backendService.get(UrlParams.clientEmployees + query);
    }

    public addNewSite(newSite: any): Observable<any> {
        return this.backendService.post(UrlParams.clientSites, JSON.stringify(newSite));
    }

    public getGroupList(): Observable<any> {
        return this.backendService.get(UrlParams.employeesGroupsList);
    }

    public findGroupeByName(name: string, page: any, sort: string): Observable<any> {
        const query = '?q=' + name + sort + '&page=' + page;
        return this.backendService.get(UrlParams.clientGroupes + query);
    }

    public addNewGroupe(newGroupe: any, urlOption: string): Observable<any> {
        return this.backendService.post(UrlParams.clientGroupes + urlOption, JSON.stringify(newGroupe));
    }
    public getGroupeForUpdate(link: string): Observable<any> {
        return this.backendService.get(UrlParams.clientGroupes + link);
    }

    getLinkForUpdate(link: string): Observable<any> {
        return this.backendService.get(UrlParams.adminLink + link);
    }

    getBibliotheques(): Observable<any> {
      return this.backendService.get(UrlParams.adminLink);
    }

    public uploadImage(file: any, siteId: number): Observable<any> {
        let formData: FormData = new FormData();
        formData.append('image', file, file.name);
        return this.backendService.loadImage_post(UrlParams.siteHome + siteId + '/image', formData);
    }
    public sendFileToServer(content: any, siteId: number): Observable<any> {
      const url = UrlParams.siteHome + siteId + '/image';
      // const formData: FormData = new FormData();
      // formData.append('file', file.name);
      // formData.append('uploadFile', content.result);
      const fileToServer = {
        content: ((((content.result).split(';'))[1]).split(','))[1]
      };
      return this.backendService.loadImage_post(url, fileToServer);
    }


    public updateClientProfile(newProfile: any): Observable<any> {
        return this.backendService.post(UrlParams.clientProfilData, JSON.stringify(newProfile));
    }

    public loadToServerProfileImage(content: any): Observable<any> {
      const url = UrlParams.clientProfilData + '/image';
      const fileToServer = {
        content: ((((content.result).split(';'))[1]).split(','))[1]
      };
      return this.backendService.loadImage_post(url, fileToServer);
    }

    public getFromServerProfileImage(): Observable<any> {
        return this.backendService.loadImage_get(UrlParams.clientProfilData + '/image' + '?encoded=1');
    }



    public encode(obj) {
        let newData = '';
        for (let key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        return newData;
    }


    deleteSites(link: string): Observable<any> {
        return this.backendService.deleteData(UrlParams.clientSites + link);
    }
    deleteGroupe(link: string): Observable<any> {
        return this.backendService.deleteData(UrlParams.clientGroupes + link);
    }
    deleteEmployee(siteId: number, employeeId: number): Observable<any> {
        let link = UrlParams.clientSites + '/' + siteId+ '/employees/' + employeeId;
        return this.backendService.deleteData(link);
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
