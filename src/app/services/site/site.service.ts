import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';
import { Observable } from 'rxjs/Observable';
import {EmployeesClass} from '../../models/const/employees-class';

@Injectable()
export class SiteService {
    public id_site: number;


    constructor(private backendService: BackendService) {}


    public setIdSite(id_site: number) {
        this.id_site = id_site;
        console.log('setted ' + this.id_site);
    }
    public getIdSite(): number {
        console.log('getting... ' + this.id_site);
        return this.id_site;
    }


    public homeData(): Observable<any> {
        return this.backendService.get(UrlParams.adminHome);
    }


    public clientList(page): Observable<any> {
        const query = '?q=&sort=&page=';
        return this.backendService.get(UrlParams.adminClients + query + page);
    }

    public findEmployeeByName(name: string, page: any, siteId: number, sort: string): Observable<any> {
        const query =  + siteId + '/employees' + '?q=' + name + sort + '&page=' + page;
        return this.backendService.get(UrlParams.siteHome + query);

    }
    public deleteEmployee(siteId: number, employeeId: number): Observable<any> {
        const query = UrlParams.siteHome + siteId + '/employees/' + employeeId;
        console.log(query);
        return this.backendService.deleteData(query);
    }


    public addNewEmployee(newEmployee: EmployeesClass, siteId: number): Observable<any> {
        const query = UrlParams.siteHome + siteId + '/employees';
        return this.backendService.post(query, JSON.stringify(newEmployee));
    }
    public getEmployeeFromEtap1(siteId: number, employeeId: number): Observable<any> {
        const query = siteId + '/employees/' + employeeId;
        return this.backendService.get(UrlParams.siteHome + query);
    }
    public updateEmployee(newEmployee: any, siteId: number, employeeId: number): Observable<any> {
        const url = UrlParams.siteHome + siteId + '/employees/' + employeeId;
        console.log(url);
        return this.backendService.post(url, JSON.stringify(newEmployee));
    }
    public addMedicaleCacesDates(MedicaleCacesDates: any, siteId: number, employeeId: number): Observable<any> {
        const url = UrlParams.siteHome + siteId + '/employees/' + employeeId + '/medical_visit_caces';
        console.log(MedicaleCacesDates);
        return this.backendService.post(url, JSON.stringify(MedicaleCacesDates));
    }
  public getMedicaleCacesDates(siteId: number, employeeId: number): Observable<any> {
    const url = UrlParams.siteHome + siteId + '/employees/' + employeeId + '/medical_visit_caces';
    console.log('======getMedicaleCacesDates url:' + url);
    return this.backendService.get(url);
  }


    public setAttestation(newAttestation: any, siteId: number, employeeId: number, urlOption: string): Observable<any> {
        const url = UrlParams.siteHome + siteId + '/employees/' + employeeId + '/attestations' + urlOption;
        console.log(url);
        return this.backendService.post(url, JSON.stringify(newAttestation));
    }
    public getOneAttestation(siteId: number, employeeId: number, attestationId: string): Observable<any> {
      const query = siteId + '/employees/' + employeeId + '/attestations' + attestationId;
        console.log(query);
        return this.backendService.get(UrlParams.siteHome + query);
    }
    // {{siteId}}/employees/{{employeeId}}/attestations/{{employeeAttestationId}}

    public getAttestations(siteId: number, employeeId: number, sort: string): Observable<any> {
        const query = siteId + '/employees/' + employeeId + '/attestations' + '?q=' + sort;
        console.log(query);
        return this.backendService.get(UrlParams.siteHome + query);
    }

    deleteAttestation(siteId: number, employeeId: number, attestationId: string): Observable<any> {
      const query = siteId + '/employees/' + employeeId + '/attestations' + attestationId;
      return this.backendService.deleteData(UrlParams.siteHome + query);
    }


    public uploadImage(file: any, siteId: number, employeeId: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', file, file.name);
        const query = siteId + '/employees/' + employeeId + '/medical_visit_caces/cases_file';
        console.log(query);

        return this.backendService.loadImage_post(UrlParams.siteHome + query, formData);
    }

    public uploadText(file: any, siteId: number, employeeId: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('image', file, file.name);
        const query = siteId + '/employees/' + employeeId + '/medical_visit_caces/cases_file';
        console.log(UrlParams.siteHome + query);

        console.log(formData);
        return this.backendService.loadImage_post(UrlParams.siteHome + query, formData);
    }



    public convertDataForInputView(strDate: string): string {
        const date = Date.parse(strDate);
        console.log(date);

// new Date((Date.parse("2017-01-01T00:00:00+0300")))

        let dd: any;
        dd = (new Date(date)).getDate();
        console.log('day ' + dd);
        if (dd < 10) {dd = '0' + dd; }

        let mm: any;
        mm = +(new Date(date)).getMonth() + 1;
        console.log('month ' + mm);
        if (mm < 10) {mm = '0' + mm; }

        return mm + '/' + dd + '/' + (new Date(date)).getFullYear();
    }


    public logout(): void {
        // clear token remove user from local storage to log user out
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
