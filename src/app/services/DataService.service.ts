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


}
