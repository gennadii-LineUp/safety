import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-fichiers-page',
  templateUrl: './site-fichiers-page.component.html',
  styleUrls: ['./site-fichiers-page.component.css']
})
export class SiteFichiersPageComponent implements OnInit {
    loading: boolean = false;
    loadingSalarieUsed: boolean = false;
    loaded: boolean = false;
    loadedSalarieUsed: boolean = false;
    errorLoad: string = '';
    errorSalaries: string = '';
    errorCreating: string = '';
    successCreating: string = '';

  constructor() { }

  ngOnInit() {
  }

}
