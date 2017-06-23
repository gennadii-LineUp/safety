import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salarie-profil',
  templateUrl: './salarie-profil.component.html',
  styleUrls: ['./salarie-profil.component.css']
})
export class SalarieProfilComponent implements OnInit {

    constructor() { }

    ngOnInit() {
      window.document.querySelectorAll('ul li:first-child')['0'].classList.add('active');
    }
    ngOnDestroy() {
        window.document.querySelectorAll('ul li:first-child')['0'].classList.remove('active');
    }


}
