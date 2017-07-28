import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-for-delete',
  templateUrl: './navbar-for-delete.component.html',
  styleUrls: ['./navbar-for-delete.component.css']
})
export class NavbarForDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public clearLS() {
      localStorage.clear();
      console.log(localStorage);
    }

}
