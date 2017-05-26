import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-sites-content',
  templateUrl: './client-sites-content.component.html',
  styleUrls: ['./client-sites-content.component.css']
})
export class ClientSitesContentComponent implements OnInit {
    loading: boolean = false;
    errorSalaries: string = 'error';
    //successCreating: string = '';

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

    private cancellErrorMessage() {
        this.loading = false;
        this.errorSalaries = '';
    }
    private cancellSuccessMessage() {
        this.loading = false;
        //this.successCreating = '';
    }

    // this.cancellErrorMessage();
    // this.cancellSuccessMessage();
    // this.loading = true;

}
