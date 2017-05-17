import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteAccueilPageComponent} from 'app/pages/site/site-accueil-page/site-accueil-page.component';
import {SiteParcPageComponent} from './site-parc-page/site-parc-page.component';
import {SiteComponent} from './site.component';
import {SiteFichiersPageComponent} from './site-fichiers-page/site-fichiers-page.component';
import {SiteReglagesPageComponent} from './site-reglages-page/site-reglages-page.component';
import {SiteSalariesPageComponent} from './site-salaries-page/site-salaries-page.component';

const siteRoutes: Routes = [
    {
        path: '',
        component: SiteComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: 'fichiers', component: SiteFichiersPageComponent },
                    { path: 'parc', component: SiteParcPageComponent },
                    { path: 'reglages', component: SiteReglagesPageComponent },
                    { path: 'salaries', component: SiteSalariesPageComponent },
                    { path: '', component: SiteAccueilPageComponent }
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


