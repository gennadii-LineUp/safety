import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';

@Injectable()
export class AdminAsClientGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

        if ((localStorage.role === 'ROLE_ADMIN') && (localStorage.role2 === 'ROLE_CLIENT')) {
            // logged as admin
            return true;
        }

        // not logged in as admin, so redirect to login page
        //this.router.navigate(['/login']);
        return false;

    }
}
