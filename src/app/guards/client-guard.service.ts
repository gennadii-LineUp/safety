import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class ClientGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

        if (localStorage.role === 'ROLE_CLIENT') {
            // logged as ClientClass
            return true;
        }

        // not logged in as ClientClass, so redirect to login page
        this.router.navigate(['']);
        return false;

    }
}
