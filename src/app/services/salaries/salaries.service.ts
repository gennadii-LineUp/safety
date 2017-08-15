import { Injectable } from '@angular/core';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend/backend.service';
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
      return this.backendService.get(query);
    }

    public findMachinesByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'machines' + '?q=' + name + sort + '&page=' + page;
      return this.backendService.get(query);
    }
    public findOneMachine(machine_id: number): Observable<any> {
      const query =  UrlParams.employeeHome + 'machines/' + machine_id;
      return this.backendService.get(query);
    }

    public getMedicalVisit(): Observable<any> {
      return this.backendService.get(UrlParams.employeeHome + 'medical_visit');
    }
    public getCacesVisit(): Observable<any> {
      return this.backendService.get(UrlParams.employeeHome + 'caces');
    }
    public getFromServerCacesImage(): Observable<any> {
      return this.backendService.loadImage_get(UrlParams.employeeHome + 'caces/file?encoded=1');
    }

    public findAttestationByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'attestations' + '?q=' + name + sort + '&page=' + page;
      return this.backendService.get(query);
    }
    public getFromServerAttestationImage(attestation_Id: number): Observable<any> {
      const query = UrlParams.employeeHome + 'attestations/' + attestation_Id + '/file?aslink=1';
      return this.backendService.loadImage_get(query);
    }

    public findDriving_licensesByName(name: string, page: any, sort: string): Observable<any> {
      const query =  UrlParams.employeeHome + 'driving_licenses' + '?q=' + name + sort + '&page=' + page;
      return this.backendService.get(query);
    }
    public getFromServerDriving_licenseImage(drLicense_id: number): Observable<any> {
      const query = UrlParams.employeeHome + 'driving_licenses/' + drLicense_id + '?aslink=1';
      return this.backendService.loadImage_get(query);
    }

  public loadToServerSalarieeImage(content: any): Observable<any> {
    const url = UrlParams.employeeHome + 'profile/photo';
    const fileToServer = {
      content: ((((content.result).split(';'))[1]).split(','))[1]
    };
    return this.backendService.loadImage_post(url, fileToServer);
  }

  public getFromServerSalarieeImage(): Observable<any> {
    const url = UrlParams.employeeHome + 'profile/photo?encoded=1';
    return this.backendService.loadImage_get(url);
  }

  public getFromServerFichier(fichier_Id: number): Observable<any> {
    const url = UrlParams.employeeHome + 'files/' + fichier_Id + '?aslink=1';
    return this.backendService.loadImage_get(url);
  }
  public getFromServerLinkForPDF_(fileLink: string): Observable<any> {
    const url = UrlParams.homeUrl + 'files/' + fileLink;
    return this.backendService.getFromUrl(url);
  }
  public getFromServerVGPFile(machine_id: number): Observable<any> {
    const url = UrlParams.employeeHome + 'machines/' + machine_id + '/vgp_file' + '?aslink=1';
    return this.backendService.loadImage_get(url);
  }
  public getFromServerCTFile(machine_id: number): Observable<any> {
    const url = UrlParams.employeeHome + 'machines/' + machine_id + '/tech_control_file' + '?aslink=1';
    return this.backendService.loadImage_get(url);
  }
  public getFromServerOtherFile(machine_id: number, otherFile_id: number): Observable<any> {
    const url = UrlParams.employeeHome + 'machines/' + machine_id + '/files/' + otherFile_id + '?aslink=1';
    return this.backendService.loadImage_get(url);
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
