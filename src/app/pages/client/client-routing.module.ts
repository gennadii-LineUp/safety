import {ClientComponent} from 'app/pages/client/client.component';
 import {ClientGroupesPageComponent} from './client-groupes-page/client-groupes-page.component';
 import {ClientSalariesPageComponent} from './client-salaries-page/client-salaries-page.component';
 import {ClientProfilPageComponent} from './client-profil-page/client-profil-page.component';
 import {ClientBibliothequePageComponent} from './client-bibliotheque-page/client-bibliotheque-page.component';
 import {ClientSitesPageComponent} from './client-sites-page/client-sites-page.component';
 import {ClientGuard} from '../../guards/client-guard.service';
 import {ClientProfilContentComponent} from './client-profil-page/client-profil-content/client-profil-content.component';

export const ClientRoutingModule = {
    path: 'client', component: ClientComponent, canActivate: [ ClientGuard],
        children: [
            { path: 'accueil', component: ClientSitesPageComponent  },
            { path: 'groupes', component: ClientGroupesPageComponent },
            { path: 'salaries', component: ClientSalariesPageComponent },
            { path: 'profil', component: ClientProfilContentComponent }, //ClientProfilPageComponent
            { path: 'bibliotheque', component: ClientBibliothequePageComponent },
            { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
};

