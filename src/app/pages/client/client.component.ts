import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor() { }

    ngOnInit(): void {
        /* MOBILE MENU */
        $('#nav-icon1').click(() =>{
            $(this).toggleClass('open');
        });
        $('#nav-icon1').click(() => {
            $('.sidebar-nav').slideToggle(400);
        });
        $(window).resize(() =>{
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

    // public mobileMenuClickable() {
    //     jQuery('#nav-icon1').click(() => {
    //         jQuery(this).toggleClass('open');
    //     });
    //     jQuery('#nav-icon1').click(() => {
    //         jQuery('.sidebar-nav').slideToggle(400);
    //     });
    //     jQuery(window).resize(() => {
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
