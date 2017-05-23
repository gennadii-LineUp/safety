import { Component, OnInit } from '@angular/core';
import { Router}    from '@angular/router';

@Component({
  selector: 'admin-clients-content',
  templateUrl: './admin-clients-content.component.html',
  styleUrls: ['./admin-clients-content.component.css']
})
export class AdminClientsContentComponent implements OnInit {

  constructor(private router: Router) { }

    ngOnInit() {
        this.tableMobileViewInit();
    }

    gotoNewClientForm() {
        this.router.navigate(['/admin/client/ajouter-un-client']);
      console.log('==85== newClient ====');
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
