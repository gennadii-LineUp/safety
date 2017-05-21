import { Component, OnInit } from '@angular/core';
//declare let jQuery:any;

@Component({
  selector: 'client-profil-content',
  templateUrl: './client-profil-content.component.html',
  styleUrls: ['./client-profil-content.component.css']
})
export class ClientProfilContentComponent implements OnInit {

  constructor() { }

    ngOnInit(): void {
        // this.mobileMenuClickable();
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
