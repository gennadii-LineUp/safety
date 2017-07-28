import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';
import {SiteClass} from '../../models/const/site-class';
import {EmployeesPasswordClass} from '../../models/const/employee-psw-class';

@Injectable()
export class SalariesService {

    constructor(public backendService: BackendService) {}


    public getProfilData(): Observable<any> {
        return this.backendService.get(UrlParams.employeeHome + 'profile');
    }
    public updateProfilData(newProfile: EmployeesPasswordClass): Observable<any> {
        return this.backendService.post(UrlParams.employeeHome + 'profile', JSON.stringify(newProfile));
    }

    public getFichiersData(): Observable<any> {
      return this.backendService.get(UrlParams.employeeHome + 'files');
    }

    public findFichiersByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'files' + '?q=' + name + sort + '&page=' + page;
      console.log(query);
      return this.backendService.get(query);
    }

    public findMachinesByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'machines' + '?q=' + name + sort + '&page=' + page;
      console.log(query);
      return this.backendService.get(query);
    }
    public findOneMachine(machine_id: number): Observable<any> {
      const query =  UrlParams.employeeHome + 'machines/' + machine_id;
      console.log(query);
      return this.backendService.get(query);
    }

    public getMedicalVisit(): Observable<any> {
      return this.backendService.get(UrlParams.employeeHome + 'medical_visit');
    }
    public getCacesVisit(): Observable<any> {
      return this.backendService.get(UrlParams.employeeHome + 'caces');
    }
    public getFromServerCacesImage(): Observable<any> {
      return this.backendService.loadImage_get(UrlParams.employeeHome + 'caces/file');
    }

    public findAttestationByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'attestations' + '?q=' + name + sort + '&page=' + page;
      console.log(query);
      return this.backendService.get(query);
    }
    public getFromServerAttestationImage(attestation_Id: number): Observable<any> {
      const query = UrlParams.employeeHome + 'attestations/' + attestation_Id + '/file?encoded=1';
      console.log(query);
      return this.backendService.loadImage_get(query);
    }

    public findDriving_licensesByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'driving_licenses' + '?q=' + name + sort + '&page=' + page;
      console.log(query);
      return this.backendService.get(query);
    }
    public getFromServerDriving_licenseImage(drLicense_Id: number): Observable<any> {
      const query = UrlParams.employeeHome + 'driving_licenses/' + drLicense_Id + '/file?encoded=1';
      console.log(query);
      return this.backendService.loadImage_get(query);
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

/////////////////////////////////////////////

  public employeeCount(): Observable<any> {
        console.log('==client service started==');
        return this.backendService.get(UrlParams.employeeCount);
    }

    public findSiteByName(name: string, page: any): Observable<any> {
        const query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientSites + query);
    }

    public findSalarieByName(name: string, page: any): Observable<any> {
        const query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientEmployees + query);
    }

    public addNewSite(newSite: any): Observable<any> {
        console.log('==client service:_addNewSite started==');
        return this.backendService.post(UrlParams.clientSites, JSON.stringify(newSite));
    }

    public getGroupList(): Observable<any> {
        return this.backendService.get(UrlParams.employeesGroupsList);
    }

    public findGroupeByName(name: string, page: any): Observable<any> {
        const query = '?q=' + name + '&page=' + page;
        return this.backendService.get(UrlParams.clientGroupes + query);
    }

    public addNewGroupe(newGroupe: any): Observable<any> {
        console.log('==client service:_addNewGroupe started==');
        return this.backendService.post(UrlParams.clientGroupes, JSON.stringify(newGroupe));
    }


    public uploadImage(file: any, siteId: number): Observable<any> {
        console.log('==client service:_uploadImage started==');
      const formData: FormData = new FormData();
        formData.append('image', file, file.name);

        return this.backendService.loadImage_post(UrlParams.siteHome + siteId + '/image', formData);
    }


    public encode(obj) {
        let newData = '';
        for (const key in obj) {
            newData += key;
            newData += '=' + encodeURI(obj[key]) + '&';
        }
        newData = newData.slice(0, -1);
        console.log(newData);
        return newData;
    }


    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    }

}
