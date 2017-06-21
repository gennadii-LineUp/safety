import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SiteService} from '../../services/site/site.service';
declare var $:any;

@Component({
  selector: 'site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
    providers: [SiteService]
})
export class SiteComponent implements OnInit {

    id_site: number;
    private sub: any;

    constructor(private route: ActivatedRoute,
                private siteService: SiteService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id_site = +params['id_site'];

            console.log(this.id_site);
        });

        this.siteService.setLog(this.id_site);

        localStorage.setItem('id_site', ''+this.id_site);
        this.tableMobileViewInit();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    public tableMobileViewInit() {
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
