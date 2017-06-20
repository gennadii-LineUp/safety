import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'responsable-site',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.css']
})
export class ResponsableSiteComponent implements OnInit {
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
