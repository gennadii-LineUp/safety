import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-salarie-autoris',
  templateUrl: './salarie-autoris.component.html',
  styleUrls: ['./salarie-autoris.component.css']
})
export class SalarieAutorisComponent implements OnInit {

  constructor() { }

    ngOnInit() {
        this.tableMobileViewInit();
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

}