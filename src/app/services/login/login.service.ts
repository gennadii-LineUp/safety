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

    // let data: any = {
    //   username: '',
    //   password: ''
    // };
    //
    // data.username = user;
    // data.password = password;
    //
    // data = this.encode(data);

      let usernamePassword = 'YWRtaW5AZXhhbXBsZS5jb206YWRtaW4=';

    return this.backendService.login(UrlParams.LOGIN, "HELLO", usernamePassword)
      .subscribe((res: any) => {
          console.log(res);
          console.log(res.roles);
          console.log(res.token);

          const roles = res.roles;
          const token = res.token;
          localStorage.setItem('roles', '11');
          localStorage.setItem('token', '22');

          // this.router.navigate(['/']);
          this.router.navigate(['/admin/accueil']);

          alert('check localStorage for token');
              localStorage.setItem('roles', '11');
              localStorage.setItem('token', '22');
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
    // console.log(newData);
    return newData;
  }

}
