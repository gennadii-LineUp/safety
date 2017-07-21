import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';

@Injectable()
export class EmployeeNullGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    if (localStorage.role === 'ROLE_EMPLOYEE') {
      // logged as employee
      return true;
    }

    // not logged in as admin, so redirect to login page
    //this.router.navigate(['/login']);
    return false;

  }
}
