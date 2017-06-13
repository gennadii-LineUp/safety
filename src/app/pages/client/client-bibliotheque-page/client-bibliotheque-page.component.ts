import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-bibliotheque-page',
  templateUrl: './client-bibliotheque-page.component.html',
  styleUrls: ['./client-bibliotheque-page.component.css']
})
export class ClientBibliothequePageComponent implements OnInit {
    loading: boolean = true;
    errorLoad: string = '';

  constructor() { }

  ngOnInit() {
  }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
