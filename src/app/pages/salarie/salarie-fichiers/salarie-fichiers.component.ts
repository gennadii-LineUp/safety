import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-salarie-fichiers',
  templateUrl: './salarie-fichiers.component.html',
  styleUrls: ['./salarie-fichiers.component.css']
})
export class SalarieFichiersComponent implements OnInit {
    emptyTable: boolean = true;

  constructor() { }

    ngOnInit() {
        this.tableMobileViewInit();
    }


///////////////////////////////////////////
//     this.emptyTable = false;
//
// * .subscribe(result => {
//     *     if (result) {
//
//         if (this.totalItems === 0) {
//             this.emptyTable = true;
//         }
//
//     * }, (err) => {
//
//     this.emptyTable = true;
//
///////////////////////////////////////////

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
