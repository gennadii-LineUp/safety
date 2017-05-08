import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminAccueilPageComponent} from 'app/pages/admin/admin-accueil-page/admin-accueil-page.component';
import {AdminReglagesPageComponent} from 'app/pages/admin/admin-reglages-page/admin-reglages-page.component';
import {AdminClientsPageComponent} from '../pages/admin/admin-clients-page/admin-clients-page.component';
import {AdminBibliothequePageComponent} from '../pages/admin/admin-bibliotheque-page/admin-bibliotheque-page.component';
import {ClientGroupesPageComponent} from 'app/pages/client/client-groupes-page/client-groupes-page.component';
import {ClientSitesPageComponent} from 'app/pages/client/client-sites-page/client-sites-page.component';
import {ClientProfilPageComponent} from '../pages/client/client-profil-page/client-profil-page.component';
import {ClientBibliothequePageComponent} from '../pages/client/client-bibliotheque-page/client-bibliotheque-page.component';
import {SiteAccueilPageComponent} from '../pages/site/site-accueil-page/site-accueil-page.component';
import {SiteReglagesPageComponent} from '../pages/site/site-reglages-page/site-reglages-page.component';
import {SiteFichiersPageComponent} from '../pages/site/site-fichiers-page/site-fichiers-page.component';
import {SiteParcPageComponent} from '../pages/site/site-parc-page/site-parc-page.component';
import {SiteSalariesPageComponent} from '../pages/site/site-salaries-page/site-salaries-page.component';
import {ClientSalariesPageComponent} from 'app/pages/client/client-salaries-page/client-salaries-page.component';
import {LoginStartComponent} from '../pages/login/login-start/login-start.component';
import {LoginMalchanceComponent} from 'app/pages/login/login-malchance/login-malchance.component';


const routes: Routes = [
    { path: '', redirectTo: 'admin/reglages', pathMatch: 'full' },
    { path: 'login', component: LoginStartComponent },
    { path: 'login_', component: LoginMalchanceComponent },
    { path: 'admin/accueil',  component: AdminAccueilPageComponent },
    { path: 'admin/reglages',  component: AdminReglagesPageComponent },
    { path: 'admin/client', component: AdminClientsPageComponent },
    { path: 'admin/bibliotheque', component: AdminBibliothequePageComponent },
    { path: 'client/accueil', component: ClientSitesPageComponent },
    { path: 'client/groupes', component: ClientGroupesPageComponent },
    { path: 'client/salaries', component: ClientSalariesPageComponent },
    { path: 'client/profil', component: ClientProfilPageComponent },
    { path: 'client/bibliotheque', component: ClientBibliothequePageComponent },
    { path: 'site/accueil', component: SiteAccueilPageComponent },
    { path: 'site/reglages', component: SiteReglagesPageComponent },
    { path: 'site/fichiers', component: SiteFichiersPageComponent },
    { path: 'site/parc', component: SiteParcPageComponent },
    { path: 'site/parc', component: SiteParcPageComponent },
    { path: 'site/salaries', component: SiteSalariesPageComponent }
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}


// const routes: Routes = [
//     {
//         path: '',
//         component: AdminPageComponent
//     }, {
//         path: 'results',
//         component: ResultsPageComponent,
//         pathMatch: 'full'
//     }, {
//         path: 'fullInfo',
//         component: DescriptionPageComponent,
//         pathMatch: 'full'
//     }, {
//         path: 'favorites',
//         component: FavoritesPageComponent,
//         pathMatch: 'full'
//     }, {
//         path: '**',
//         component: NotFoundPageComponent
//     }
// ]
