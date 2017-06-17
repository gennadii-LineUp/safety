import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

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
