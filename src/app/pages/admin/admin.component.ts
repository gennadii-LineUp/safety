import {Component, OnInit} from '@angular/core';
//import {ActivatedRoute} from '@angular/router';
//import {Subscription} from 'rxjs/Subscription';
//declare let jQuery:any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    // private menuItem: number;
    // private routeSubscription: Subscription;

    // constructor(private route: ActivatedRoute) {
    //
    //     this.routeSubscription = route.params.subscribe(params => this.menuItem = params['menuItem']);
    // }
    //
    // ngOnDestroy() {
    //     this.routeSubscription.unsubscribe();
    // }

    ngOnInit(): void {
      //  this.mobileMenuClickable();
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
