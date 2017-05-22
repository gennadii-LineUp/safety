import {ClientComponent} from 'app/pages/client/client.component';
// import {ClientGroupesPageComponent} from './client-groupes-page/client-groupes-page.component';
// import {ClientSalariesPageComponent} from './client-salaries-page/client-salaries-page.component';
// import {ClientProfilPageComponent} from './client-profil-page/client-profil-page.component';
// import {ClientBibliothequePageComponent} from './client-bibliotheque-page/client-bibliotheque-page.component';
// import {ClientSitesPageComponent} from './client-sites-page/client-sites-page.component';
import {ClientGuard} from '../../guards/client-guard.service';
import {ClientSitesContentComponent} from './client-sites-page/client-sites-content/client-sites-content.component';
import {ClientGroupesContentComponent} from './client-groupes-page/client-groupes-content/client-groupes-content.component';
import {ClientProfilContentComponent} from './client-profil-page/client-profil-content/client-profil-content.component';
import {ClientBibliothequeContentComponent} from './client-bibliotheque-page/client-bibliotheque-content/client-bibliotheque-content.component';
import {ClientSalariesContentComponent} from './client-salaries-page/client-salaries-content/client-salaries-content.component';

export const ClientRoutingModule = {
    path: 'client', component: ClientComponent, canActivate: [ ClientGuard],
        children: [
            { path: 'accueil', component: ClientSitesContentComponent  }, //ClientSitesPageComponent
            { path: 'groupes', component: ClientGroupesContentComponent }, //ClientGroupesPageComponent
            { path: 'salaries', component: ClientSalariesContentComponent }, //ClientSalariesPageComponent
            { path: 'profil', component: ClientProfilContentComponent }, //ClientProfilPageComponent
            { path: 'bibliotheque', component: ClientBibliothequeContentComponent }, //ClientBibliothequePageComponent
            { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
};

