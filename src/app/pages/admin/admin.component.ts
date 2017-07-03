import {Component, OnInit} from '@angular/core';
import {AdminAsClientGuard} from '../../guards/admin-as-client-guard.service';
//import {ActivatedRoute} from '@angular/router';
//import {Subscription} from 'rxjs/Subscription';
declare var $:any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private adminAsClientGuard: AdminAsClientGuard){
        if (this.adminAsClientGuard.canActivate()) {
            console.log('in AdminComponent');
            console.log(localStorage);

            // setTimeout(() => {
             localStorage.setItem('role', localStorage.previous_roleAdmin);
             localStorage.setItem('token', localStorage.previous_tokenAdmin);
            // }, 100);

            setTimeout(() => {
                localStorage.removeItem('previous_tokenAdmin');
                localStorage.removeItem('previous_roleAdmin');
            }, 100);
            console.log(localStorage);
        }
    }


    ngOnInit(): void {
        this.mobileMenuViewInit();
      //  this.tableMobileViewInit();

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

    // public tableMobileViewInit() {
    //     let headertext = [],
    //         headers = document.querySelectorAll("th"),
    //         tablerows = document.querySelectorAll("th"),
    //         tablebody = document.querySelector("tbody");
    //     if (document.querySelector("table")) {
    //         for(let i = 0; i < headers.length; i++) {
    //             let current = headers[i];
    //             headertext.push(current.textContent.replace(/\r?\n|\r/,""));
    //         }
    //         for (let i = 0, row; row = tablebody.rows[i]; i++) {
    //             for (let j = 0, col; col = row.cells[j]; j++) {
    //                 col.setAttribute("data-th", headertext[j]);
    //             }
    //         }
    //     }
    // }


}
