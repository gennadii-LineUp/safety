import {Component, OnInit} from '@angular/core';
import {AdminAsClientGuard} from '../../guards/admin-as-client-guard.service';
declare var $:any;

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(public adminAsClientGuard: AdminAsClientGuard) {
        if (this.adminAsClientGuard.canActivate()) {
             localStorage.setItem('role', localStorage.previous_roleAdmin);
             localStorage.setItem('token', localStorage.previous_tokenAdmin);

            setTimeout(() => {
                localStorage.removeItem('previous_tokenAdmin');
                localStorage.removeItem('previous_roleAdmin');
            }, 100);
        }
    }

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
                $('.sidebar-nav').slideDown();
            }
            else {
                $('#nav-icon1').removeClass('open');
                $('.sidebar-nav').slideUp();
            }
        });
    }

}
