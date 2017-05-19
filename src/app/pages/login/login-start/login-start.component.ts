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
    loading = false;
    error = '';

    constructor(private backendService: BackendService,
                private loginService: LoginService,
                private router: Router) { }

    ngOnInit() {
        console.log(localStorage);

    }

    private cancellError() {
        this.loading = false;
        this.error = '';
    }

    login(userEmail:string, password: string) {
        //   this.loginService.login('admin@example.com', 'admin');

        this.loading = true;
        this.loginService.login(userEmail, password)
            .subscribe(result => {
                if (result.token) {
                        localStorage.setItem('role', result.roles);
                        localStorage.setItem('token', result.token);
                        console.log('true, ' + localStorage.role);
                        if (localStorage.role === 'ROLE_ADMIN') {this.router.navigate(['/admin']);}
                        if (localStorage.role === 'ROLE_CLIENT') {this.router.navigate(['/client']);}
                        this.loading = false;
                }
            }, (err) => {
                this.error = 'Username or password is incorrect';
                this.loading = false;
                //console.log(err);
            });

    }


    //admin@example.com
    //admin

}
