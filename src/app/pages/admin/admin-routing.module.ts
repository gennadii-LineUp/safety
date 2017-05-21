import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
// import {AdminClientsPageComponent} from './admin-clients-page/admin-clients-page.component';
// import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';
// import {AdminAccueilPageComponent} from './admin-accueil-page/admin-accueil-page.component';
import {AdminComponent} from 'app/pages/admin/admin.component';
import {AuthGuard} from '../../guards/auth-guards.service';
import {AdminGuard} from '../../guards/admin-guard.service';
import {AdminAccueilContentComponent} from './admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import {AdminClientsContentComponent} from './admin-clients-page/admin-clients-content/admin-clients-content.component';
import {AdminReglagesContentComponent} from './admin-reglages-page/admin-reglages-content/admin-reglages-content.component';
import {AdminBibliothequeContentComponent} from './admin-bibliotheque-page/admin-bibliotheque-content/admin-bibliotheque-content.component';

const adminRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [ AdminGuard],
        children: [
            { path: 'accueil', component: AdminAccueilContentComponent },//AdminAccueilPageComponent
            { path: 'reglages', component: AdminReglagesContentComponent }, //AdminReglagesPageComponent
            { path: 'client', component: AdminClientsContentComponent }, //AdminClientsPageComponent
            { path: 'bibliotheque', component: AdminBibliothequeContentComponent }, //AdminBibliothequePageComponent
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


