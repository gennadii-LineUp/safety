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
        this.mobileMenuViewInit();
     //   this.tableMobileViewInit();
    }

    ngOnDestroy() {

       // localStorage.removeItem('previous_tokenAdmin');
      //  localStorage.removeItem('previous_roleAdmin');
      //  console.log('tokens removed');
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
