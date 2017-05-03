import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminAccueilPageComponent} from 'app/pages/admin/admin-accueil-page/admin-accueil-page.component';
import {AdminReglagesPageComponent} from 'app/pages/admin/admin-reglages-page/admin-reglages-page.component';
import {AdminClientsPageComponent} from '../pages/admin/admin-clients-page/admin-clients-page.component';
import {AdminBibliothequePageComponent} from '../pages/admin/admin-bibliotheque-page/admin-bibliotheque-page.component';


const routes: Routes = [
    { path: '', redirectTo: 'admin/accueil', pathMatch: 'full' },
    { path: 'admin/accueil',  component: AdminAccueilPageComponent },
    { path: 'admin/reglages',  component: AdminReglagesPageComponent },
    { path: 'admin/client', component: AdminClientsPageComponent },
    { path: 'admin/bibliotheque', component: AdminBibliothequePageComponent }
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
