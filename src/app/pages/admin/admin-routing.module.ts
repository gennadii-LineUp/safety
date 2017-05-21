import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
import {AdminClientsPageComponent} from './admin-clients-page/admin-clients-page.component';
import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';
import {AdminAccueilPageComponent} from './admin-accueil-page/admin-accueil-page.component';
import {AdminComponent} from 'app/pages/admin/admin.component';
import {AuthGuard} from '../../guards/auth-guards.service';
import {AdminGuard} from '../../guards/admin-guard.service';

const adminRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: 'accueil', component: AdminAccueilPageComponent  },
            { path: 'reglages', component: AdminReglagesPageComponent },
            { path: 'client', component: AdminClientsPageComponent },
            { path: 'bibliotheque', component: AdminBibliothequePageComponent },
            { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(adminRoutes) ],
    exports: [ RouterModule ],
    providers: [
        AuthGuard, AdminGuard
    ]
})
export class AdminRoutingModule {}


