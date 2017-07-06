import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {UrlParams} from '../../models/const/URL_PARAMS';

//import { Subject } from 'rxjs/Subject';
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

    public findEmployeeByName(name: string, page: any, siteId: number): Observable<any> {
        let query = '?q=' + name + '&sort=' + page;
        return this.backendService.get(UrlParams.siteHome+siteId+'/employees' + query);
    }
    public deleteEmployee(siteId: number, employeeId: number): Observable<any> {
        let query = UrlParams.siteHome + siteId + '/employees/' + employeeId;
        console.log(query);
        return this.backendService.delete(query);
    }


    public addNewEmployee(newEmployee: EmployeesClass, siteId: number): Observable<any> {
        let query = UrlParams.siteHome+siteId+'/employees';
        return this.backendService.post(query, JSON.stringify(newEmployee));
    }
    public getEmployeeFromEtap1(siteId: number, employeeId: number): Observable<any> {
        let query = siteId + '/employees/' + employeeId;
        return this.backendService.get(UrlParams.siteHome + query);
    }
    public updateEmployee(newEmployee: any, siteId: number, employeeId: number): Observable<any> {
        let url = UrlParams.siteHome + siteId + '/employees/' + employeeId;
        console.log(url);
        return this.backendService.post(url, JSON.stringify(newEmployee));
    }
    public addMedicaleCacesDates(MedicaleCacesDates: any, siteId: number, employeeId: number): Observable<any> {
        let url = UrlParams.siteHome + siteId + '/employees/' + employeeId + '/medical_visit_caces';
        console.log(url);
        return this.backendService.post(url, JSON.stringify(MedicaleCacesDates));
    }


    public setAttestation(newAttestation: any, siteId: number, employeeId: number): Observable<any> {
        let url = UrlParams.siteHome + siteId + '/employees/' + employeeId + '/attestations';
        console.log(url);
        return this.backendService.post(url, JSON.stringify(newAttestation));
    }
    public getOneAttestation(siteId: number, employeeId: number, attestationId: number): Observable<any> {
        let query = siteId + '/employees/' + employeeId + '/attestations';
        console.log(query);
        return this.backendService.get(UrlParams.siteHome + query);
    }

    public getAttestations(siteId: number, employeeId: number, sort:string): Observable<any> {
        let query = siteId + '/employees/' + employeeId + '/attestations' + '?q=' + sort;
        console.log(query);
        return this.backendService.get(UrlParams.siteHome + query);
    }

    deleteAttestation(attestation: string): Observable<any> {
        return this.backendService.delete(UrlParams.siteHome + attestation);
    }


    public uploadImage(file: any, siteId: number, employeeId: number): Observable<any> {
        let formData:FormData = new FormData();
        formData.append('image', file, file.name);
        let query = siteId + '/employees/' + employeeId + '/medical_visit_caces/cases_file';
        console.log(query);

        return this.backendService.loadImage_post(UrlParams.siteHome + query, formData);
    }

    public uploadText(file: any, siteId: number, employeeId: number): Observable<any> {
        let formData:FormData = new FormData();
        formData.append('file', file, file.name);
        let query = siteId + '/employees/' + employeeId + '/medical_visit_caces/cases_file';
        console.log(UrlParams.siteHome + query);

        return this.backendService.loadImage_post(UrlParams.siteHome + query, formData);
    }



    public convertDataForInputView(strDate: string): string {
        let date = new Date(strDate);
        let mm:any;
        mm = +date.getMonth() + 1;
        if (mm < 10) {mm= '0' + mm};
        let dd:any;
        dd = +date.getDate() + 1;
        if (dd < 10) {dd = '0' + dd};

        return mm + '/' + dd + '/' + date.getFullYear();
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
