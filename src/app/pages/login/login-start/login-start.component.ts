import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from '../../../services/backend/backend.service';
import {LoginService} from '../../../services/login/login.service';

@Component({
  selector: 'login-start',
  templateUrl: './login-start.component.html',
  styleUrls: ['./login-start.component.css']
})
export class LoginStartComponent implements OnInit {

    constructor(private backendService: BackendService,
                private loginService: LoginService,
                private router: Router) { }

  ngOnInit() {
  }

    login(userEmail:string, password: string) {
        // this.loginService.login(userEmail, password);
           this.loginService.login('admin@example.com', 'admin');
    }


    //admin@example.com
    //admin

}
