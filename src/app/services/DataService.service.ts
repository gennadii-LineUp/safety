import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Rx';
declare let $: any;

@Injectable()
export class DataService {

  public datepickerFranceFormat() {
    $.datepicker.regional['fr'] = {clearText: 'Effacer', clearStatus: '',
      closeText: 'Fermer', closeStatus: 'Fermer sans modifier',
      prevText: '&lt;Préc', prevStatus: 'Voir le mois précédent',
      nextText: 'Suiv&gt;', nextStatus: 'Voir le mois suivant',
      currentText: 'Courant', currentStatus: 'Voir le mois courant',
      monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
        'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
      monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
        'Jul','Aoû','Sep','Oct','Nov','Déc'],
      monthStatus: 'Voir un autre mois', yearStatus: 'Voir un autre année',
      weekHeader: 'Sm', weekStatus: '',
      dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
      dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
      dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
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
    let month = parseInt(dateItems[monthIndex]);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }
  // stringToDate("17/9/2014","dd/MM/yyyy","/");
  // stringToDate("9/17/2014","mm/dd/yyyy","/")
  // stringToDate("9-17-2014","mm-dd-yyyy","-")


  public convertDateFromInputeToServer(date: string) {
    const str = date.split('/').reverse().join('-');
    const newDate = new Date(str + 'T00:00:00.000');
    return newDate.toISOString();
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

    return t1.getDate() + '/' + t1.getMonth() + 1 + '/' + t1.getFullYear();
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

}
