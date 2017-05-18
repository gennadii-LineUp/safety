import { Component, OnInit } from '@angular/core';
import {ProgressBarFillService} from '../../../../services/progress-bar-fill.service';
import {ProgressBarTESTclass} from 'app/models/const/progress-bar-test-class';
// declare let jQuery:any;

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
        // this.mobileMenuClickable();
    }

    getProgressBarValues(): void {
        this.progressBarFillService.get().then(values => this.progressBarValues = values);
    }

    // public mobileMenuClickable() {
    //     jQuery('#nav-icon1').click(function () {
    //         jQuery(this).toggleClass('open');
    //     });
    //     jQuery('#nav-icon1').click(function () {
    //         jQuery('.sidebar-nav').slideToggle(400);
    //     });
    //     jQuery(window).resize(function () {
    //         let windowWidth = window.innerWidth;
    //         if (windowWidth > 991) {
    //             jQuery(".sidebar-nav").slideDown();
    //         }
    //         else {
    //             jQuery("#nav-icon1").removeClass('open');
    //             jQuery(".sidebar-nav").slideUp();
    //         }
    //     });
    // }


}
