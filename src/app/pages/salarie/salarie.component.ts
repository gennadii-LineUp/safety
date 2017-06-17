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

}
