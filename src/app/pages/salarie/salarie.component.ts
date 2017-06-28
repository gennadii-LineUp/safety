import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.mobileMenuViewInit();
    }

    public mobileMenuViewInit() {
        /* MOBILE MENU */
        $('#nav-icon1').click(function(){
            $(this).toggleClass('open');
        });
        $('#nav-icon1').click(function(){
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
