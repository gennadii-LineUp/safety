import {Component, OnInit} from '@angular/core';
//import {ActivatedRoute} from '@angular/router';
//import {Subscription} from 'rxjs/Subscription';
declare var $:any;

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

        /* MOBILE MENU */
            $('#nav-icon1').click(function(){
                $(this).toggleClass('open');
            });
            $('#nav-icon1').click(function() {
                $('.sidebar-nav').slideToggle(400);
            });
            $(window).resize(function(){
                var windowWidth = window.innerWidth;
                if (windowWidth > 991) {
                    $(".sidebar-nav").slideDown();
                }
                else {
                    $("#nav-icon1").removeClass('open');
                    $(".sidebar-nav").slideUp();
                }
            });

    }



}
