import { Component, OnInit } from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {ProgressBarTESTclass} from 'app/models/const/progress-bar-test-class';

@Component({
  selector: 'admin-accueil-content',
  templateUrl: './admin-accueil-content.component.html',
  styleUrls: ['./admin-accueil-content.component.css'],
    providers: [ProgressBarFillService],
})
export class AdminAccueilContentComponent implements OnInit {

    progressBarValues: ProgressBarTESTclass[]; //added for component testing
    progressBarSelectedValue: ProgressBarTESTclass; //added for component testing

    constructor(private progressBarFillService: ProgressBarFillService){}

    ngOnInit(): void {
        this.getProgressBarValues();
    }

    getProgressBarValues(): void {
        this.progressBarFillService.get().then(values => this.progressBarValues = values);
    }


}
