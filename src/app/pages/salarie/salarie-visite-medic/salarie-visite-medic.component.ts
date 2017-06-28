import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';

@Component({
  selector: 'app-salarie-visite-medic',
  templateUrl: './salarie-visite-medic.component.html',
  styleUrls: ['./salarie-visite-medic.component.css'],
    providers: [SalariesService]
})
export class SalarieVisiteMedicComponent implements OnInit {

    constructor(private salariesService: SalariesService) { }

  ngOnInit() {
  }

}
