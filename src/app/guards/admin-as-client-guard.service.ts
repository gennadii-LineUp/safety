import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';

@Injectable()
export class AdminAsClientGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.getItem('previous_roleAdmin') && localStorage.getItem('previous_tokenAdmin')) {
      // logged before as admin
      return true;
    }

    // not logged in as admin, so redirect to login page
    // this.router.navigate(['/login']);
    return false;

  }
}
