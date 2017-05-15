import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ClientComponent} from 'app/pages/client/client.component';
import {ClientGroupesPageComponent} from './client-groupes-page/client-groupes-page.component';
import {ClientSalariesPageComponent} from './client-salaries-page/client-salaries-page.component';
import {ClientProfilPageComponent} from './client-profil-page/client-profil-page.component';
import {ClientBibliothequePageComponent} from './client-bibliotheque-page/client-bibliotheque-page.component';
import {ClientSitesPageComponent} from './client-sites-page/client-sites-page.component';

const clientRoutes: Routes = [
    {
        path: '',
        component: ClientComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    { path: 'groupes', component: ClientGroupesPageComponent },
                    { path: 'salaries', component: ClientSalariesPageComponent },
                    { path: 'profil', component: ClientProfilPageComponent },
                    { path: 'bibliotheque', component: ClientBibliothequePageComponent },
                    { path: '', component: ClientSitesPageComponent }
                ]
            }
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forRoot(clientRoutes) ],
    exports: [ RouterModule ]
})
export class ClientRoutingModule {}


