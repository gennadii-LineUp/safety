import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class EmployeeGeneralGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.employeeAccess === 'general') {
      // logged as employee
      return true;
    }

    // not logged in as employee, so redirect to login page
    // this.router.navigate(['']);
    return false;

  }
}
