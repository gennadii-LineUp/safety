import { Component, OnInit } from '@angular/core';
//declare let jQuery:any;

@Component({
  selector: 'admin-bibliotheque-content',
  templateUrl: './admin-bibliotheque-content.component.html',
  styleUrls: ['./admin-bibliotheque-content.component.css']
})
export class AdminBibliothequeContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      this.tableMobileViewInit();
      // this.mobileMenuClickable();
  }

  public tableMobileViewInit() {
      let headertext = [],
          headers = document.querySelectorAll("th"),
          tablerows = document.querySelectorAll("th"),
          tablebody = document.querySelector("tbody");
      if (document.querySelector("table")) {
          for(let i = 0; i < headers.length; i++) {
              let current = headers[i];
              headertext.push(current.textContent.replace(/\r?\n|\r/,""));
          }
          for (let i = 0, row; row = tablebody.rows[i]; i++) {
              for (let j = 0, col; col = row.cells[j]; j++) {
                  col.setAttribute("data-th", headertext[j]);
              }
          }
      }
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
