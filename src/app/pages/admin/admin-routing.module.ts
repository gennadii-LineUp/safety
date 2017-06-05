import {AdminComponent} from 'app/pages/admin/admin.component';
import {AdminGuard} from '../../guards/admin-guard.service';
import {AdminAccueilContentComponent} from './admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import {AdminClientsContentComponent} from './admin-clients-page/admin-clients-content/admin-clients-content.component';
import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';

export const AdminRoutingModule = {
    path: 'admin', component: AdminComponent, canActivate: [ AdminGuard], //data: { pageName: 'admin' },
    children: [
        { path: 'accueil', component: AdminAccueilContentComponent },//AdminAccueilPageComponent
        { path: 'reglages', component: AdminReglagesPageComponent }, //
        { path: 'client', component: AdminClientsContentComponent }, //AdminClientsPageComponent
        { path: 'bibliotheque', component: AdminBibliothequePageComponent }, //
        { path: '', redirectTo: 'accueil', pathMatch: 'full' }
    ]
};
