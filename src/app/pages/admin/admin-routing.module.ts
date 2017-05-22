// import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
// import {AdminClientsPageComponent} from './admin-clients-page/admin-clients-page.component';
// import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';
// import {AdminAccueilPageComponent} from './admin-accueil-page/admin-accueil-page.component';
import {AdminComponent} from 'app/pages/admin/admin.component';
import {AdminGuard} from '../../guards/admin-guard.service';
import {AdminAccueilContentComponent} from './admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import {AdminClientsContentComponent} from './admin-clients-page/admin-clients-content/admin-clients-content.component';
import {AdminReglagesContentComponent} from './admin-reglages-page/admin-reglages-content/admin-reglages-content.component';
import {AdminBibliothequeContentComponent} from './admin-bibliotheque-page/admin-bibliotheque-content/admin-bibliotheque-content.component';

export const AdminRoutingModule = {
    path: 'admin', component: AdminComponent, canActivate: [ AdminGuard], //data: { pageName: 'admin' },
    children: [
        { path: 'accueil', component: AdminAccueilContentComponent },//AdminAccueilPageComponent
        { path: 'reglages', component: AdminReglagesContentComponent }, //AdminReglagesPageComponent
        { path: 'client', component: AdminClientsContentComponent }, //AdminClientsPageComponent
        { path: 'bibliotheque', component: AdminBibliothequeContentComponent }, //AdminBibliothequePageComponent
        { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
};
