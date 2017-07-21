import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class EmployeeAdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {

    if (localStorage.employeeAccess === 'admin') {
      // logged as employee
      return true;
    }

    // not logged in as employee, so redirect to login page
    // this.router.navigate(['']);
    return false;

  }
}
