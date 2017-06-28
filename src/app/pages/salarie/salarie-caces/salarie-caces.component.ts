import { Component, OnInit } from '@angular/core';
import {SalariesService} from '../../../services/salaries/salaries.service';

@Component({
  selector: 'app-salarie-caces',
  templateUrl: './salarie-caces.component.html',
  styleUrls: ['./salarie-caces.component.css'],
    providers: [SalariesService]
})
export class SalarieCacesComponent implements OnInit {

    constructor(private salariesService: SalariesService) { }

  ngOnInit() {
  }

}
