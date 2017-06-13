import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-reglages-page',
  templateUrl: './admin-reglages-page.component.html',
  styleUrls: ['./admin-reglages-page.component.css']
})
export class AdminReglagesPageComponent implements OnInit {
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
