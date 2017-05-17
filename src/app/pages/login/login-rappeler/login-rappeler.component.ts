import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login-rappeler',
  templateUrl: './login-rappeler.component.html',
  styleUrls: ['./login-rappeler.component.css']
})
export class RappelerLeMotDePasseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public EnvoyerEmailFunction() {
      console.log("EnvoyerEmailFunction");
      this.router.navigate(['/login']);
  }

}
