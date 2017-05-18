import { Injectable } from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Router} from '@angular/router';
import {UrlParams} from '../../models/const/URL_PARAMS';
import {CONTENT_TYPE} from '../../models/const/CONTENT_TYPE';

@Injectable()
export class LoginService {

  constructor(private backendService: BackendService,
              private router: Router) { }

  login(user: string, password: string) {

    // admin@example.com
    // admin

      let usernamePassword = btoa(user+':'+password);
    // let usernamePassword: any = { username: '', password: '' };
    // usernamePassword.username = user;
    // usernamePassword.password = password;
    //
    // usernamePassword = this.encode(usernamePassword);
      console.log('====');

    //  let usernamePassword = 'YWRtaW5AZXhhbXBsZS5jb206YWRtaW4=';

    return this.backendService.login(UrlParams.LOGIN, "HELLO", usernamePassword)
      .subscribe((res: any) => {

          const roles = res.roles;
          const token = res.token;

              localStorage.setItem('roles', roles);
              localStorage.setItem('token', token);


              // this.router.navigate(['/']);
          // this.router.navigate(['/admin']);

          console.log(localStorage.roles);

              if (localStorage.roles === 'ROLE_ADMIN') {
                  this.router.navigate(['/admin']);
              }
              if (localStorage.roles === 'ROLE_CLIENT') {
                  this.router.navigate(['/client']);
              }


          },
        err => {
          console.log(err);
        });

  }

  encode(obj) {
    let newData = '';
    for (let key in obj) {
      newData += key;
      newData += '=' + encodeURI(obj[key]) + '&';
    }
    newData = newData.slice(0, -1);
    return newData;
  }

}
