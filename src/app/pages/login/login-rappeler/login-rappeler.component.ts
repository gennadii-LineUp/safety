import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login-rappeler',
  templateUrl: './login-rappeler.component.html',
  styleUrls: ['./login-rappeler.component.css']
})
export class RappelerLeMotDePasseComponent implements OnInit {
    loading: boolean = false;
    errorLoad: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public EnvoyerEmailFunction() {
      console.log("EnvoyerEmailFunction");
      this.router.navigate(['']);  ///login
  }

    private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
