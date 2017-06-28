import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';

@Component({
  selector: 'salarie-profil',
  templateUrl: './salarie-profil.component.html',
  styleUrls: ['./salarie-profil.component.css'],
    providers: [SalariesService]
})
export class SalarieProfilComponent implements OnInit {

    constructor(private salariesService: SalariesService) { }

    ngOnInit() {
      window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
    }
    ngOnDestroy() {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }


}
