import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';

@Injectable()
export class ClientOrEmplAdminOrEmplGeneralGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.role === 'ROLE_CLIENT'
      || localStorage.employeeAccess === 'admin'
      || localStorage.employeeAccess === 'general' ) {
      // logged as ClientClass
      return true;
    }

    // not logged in as ClientClass, so redirect to login page
    // this.router.navigate(['/login']);
    return false;

  }
}
