import { Component, OnInit } from '@angular/core';
import {AdminGuard} from '../../../guards/admin-guard.service';
import {ClientGuard} from '../../../guards/client-guard.service';
declare let jQuery:any;

@Component({
  selector: 'app-inner-pages',
  templateUrl: './inner-pages.component.html',
  styleUrls: ['./inner-pages.component.css'],
    providers: [
        AdminGuard, ClientGuard
    ]
})
export class InnerPagesComponent implements OnInit {

    loggedInAsAdmin = false;
    loggedInAsClient = false;

    constructor(private adminGuard: AdminGuard,
              private clientGuard: ClientGuard ) { }

  ngOnInit() {
        this.checkLoggedInUser();
        this.mobileMenuClickable();
  }

  public checkLoggedInUser() {
        if (this.adminGuard.canActivate()) {
            this.loggedInAsClient = false;
            this.loggedInAsAdmin = true;
        }
      if (this.clientGuard.canActivate()) {
          this.loggedInAsAdmin = false;
          this.loggedInAsClient = true;
      }
  }

    public mobileMenuClickable() {
        jQuery('#nav-icon1').click(function () {
            jQuery(this).toggleClass('open');
        });
        jQuery('#nav-icon1').click(function () {
            jQuery('.sidebar-nav').slideToggle(400);
        });
        jQuery(window).resize(function () {
            let windowWidth = window.innerWidth;
            if (windowWidth > 991) {
                jQuery(".sidebar-nav").slideDown();
            }
            else {
                jQuery("#nav-icon1").removeClass('open');
                jQuery(".sidebar-nav").slideUp();
            }
        });
    }


}
