import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
import {AdminClientsPageComponent} from './admin-clients-page/admin-clients-page.component';
import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';
import {AdminAccueilPageComponent} from './admin-accueil-page/admin-accueil-page.component';
import {AdminComponent} from 'app/pages/admin/admin.component';

const siteRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: 'reglages', component: AdminReglagesPageComponent },
                    { path: 'client', component: AdminClientsPageComponent },
                    { path: 'bibliotheque', component: AdminBibliothequePageComponent },
                    { path: '', component: AdminAccueilPageComponent }
                ]
            }
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(siteRoutes) ],
    exports: [ RouterModule ]
})
export class SiteRoutingModule {}


