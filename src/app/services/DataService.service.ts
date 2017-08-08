import { Injectable } from '@angular/core';
import {BackendService} from './backend/backend.service';
import {ErrorMessageHandlerService} from './error/error-message-handler.service';
import {UrlParams} from '../models/const/URL_PARAMS';
import {Response, Http, Headers} from '@angular/http';
declare let $: any;

@Injectable()
export class DataService {
  errorLoad = '';

  constructor(public backendService: BackendService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public http: Http) {}


  public datepickerFranceFormat() {
    $.datepicker.regional['fr'] = {clearText: 'Effacer', clearStatus: '',
      closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
      prevText: '&lt;Préc', prevStatus: 'Voir le mois précédent',
      nextText: 'Suiv&gt;', nextStatus: 'Voir le mois suivant',
      currentText: 'Courant', currentStatus: 'Voir le mois courant',
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
        'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
      weekHeader: 'Sm', weekStatus: '',
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      dayStatus: 'Utiliser DD comme premier jour de la semaine', dateStatus: 'Choisir le DD, MM d',
      dateFormat: 'dd/mm/yy', firstDay: 0,
      initStatus: 'Choisir la date', isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['fr']);
  }

  public stringToDate(_date, _format, _delimiter) {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex], 10);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    console.log(formatedDate);
    return formatedDate;
  }
  // stringToDate("17/9/2014","dd/MM/yyyy","/");
  // stringToDate("9/17/2014","mm/dd/yyyy","/")
  // stringToDate("9-17-2014","mm-dd-yyyy","-")


  public toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
      + ('0' + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  public convertDateFromInputeToServer(datepicker: string): string {   // doesn't work properly, but MUST be used !
    // const str = datepicker.split('/').reverse().join('-');
    // console.log(typeof str + ' ' + str);
    // const aa = str + 'T00:00:00.000';
    // console.log(typeof aa + ' ' + aa);
    // const bb = new Date(aa);
    // console.log(typeof bb + ' ' + bb);

    const date = this.stringToDate(datepicker, 'dd/MM/yyyy', '/');
    console.log(date);
    const newDate = date.toISOString();
    console.log(newDate);

    return newDate;
  }


  public stringToISOString(date: string) {
    let str = date.split('/').reverse().join('-');
    str += 'T00:00:00.000';
    return str;
  }
  // 25/12/2017 --> 2017-12-25


//  var t1 = new Date("2017-11-10T01:00:00+03:00"); console.log('"2017-11-10T01:00:00+03:00": '+t1.getDate()+'/'+t1.getMonth()+'/'+t1.getFullYear());
  public convertDateFromServerToInput(strDate: string): string {
    const t1 = new Date(strDate);
    const _month = 1 + +t1.getMonth();
    let month: string;
    if (+_month < 10) { month = '0' + _month; }
    let day: any;
    day = t1.getDate() + 1;  //  DELETE AFTER FIXING  +1
    if (day < 10) {day = '0' + day; }

    return day + '/' + month + '/' + t1.getFullYear();
  }


  public convertDateForInputView(strDate: string): string {
    const date = Date.parse(strDate);
    // console.log(date);
    // new Date((Date.parse("2017-01-01T00:00:00+0300")))

    let dd: any;
    dd = (new Date(date)).getDate();
    // console.log('day ' + dd);
    if (dd < 10) {dd = '0' + dd; }

    let mm: any;
    mm = +(new Date(date)).getMonth() + 1;
    // console.log('month ' + mm);
    if (mm < 10) {mm = '0' + mm; }

    return dd + '/' + mm + '/' + (new Date(date)).getFullYear();
  }



  public refreshToken(err: any, request: any, successRequest: (result?: any) => void): void {
   // const $this = this;

    let errorMsg = '';
    try {
      errorMsg = JSON.parse(err._body).error;
    } catch (error) { }

    if (err.status === 401 && (errorMsg === 'Expired JWT Token' || errorMsg === 'User not found. Try to refresh access token')) {
      const refresh = {
        refresh_token: localStorage.getItem('refresh_token')
      };


      console.log('token_refresh()  started');
      const headers: Headers = new Headers();
      const refresh_token = localStorage.getItem('refresh_token');
      const url = UrlParams.tokRefresh;

      // headers.append('refresh_token', refresh_token);
      let result: any;
      this.http.post(url, refresh, {headers: headers})
        .map((res: Response) => result = res.json());
        // .then((result: any) => {
        //   console.log(result);
        //   if (result.token) {localStorage.setItem('token', result.token); }
        //   if (result.refresh_token)  {localStorage.setItem('refresh_token', result.refresh_token); console.log('refreshed !!'); }
        // });
      // .catch((res: Response) => console.log(res));

      console.log(result);
      if (result.token) {localStorage.setItem('token', result.token); }
      if (result.refresh_token)  {localStorage.setItem('refresh_token', result.refresh_token); console.log('refreshed !!'); }



      // this.backendService.token_refresh(refresh).subscribe(result => {
      //   console.log(result);
      //   localStorage.setItem('token', result.token);
      //   localStorage.setItem('refresh_token', result.refresh_token);
      //   console.log(request);
      //   console.dir(request);
      //
      //   request.subscribe(successRequest, (err) => {
      //     console.log('====error=============');
      //     this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      //   });
      //
      // }, (err) => {
      //   console.log(err);
      //   this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      // });

    } else {
      this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
    }
  }

  public returnErrorLoad(): string {
    return this.errorLoad;
  }

}
