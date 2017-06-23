import {AdminComponent} from 'app/pages/admin/admin.component';
import {AdminGuard} from '../../guards/admin-guard.service';
import {AdminAccueilContentComponent} from './admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import {AdminReglagesPageComponent} from './admin-reglages-page/admin-reglages-page.component';
import {AdminBibliothequePageComponent} from './admin-bibliotheque-page/admin-bibliotheque-page.component';
import {AdminClientsPageComponent} from './admin-clients-page/admin-clients-page.component';

export const AdminRoutingModule = {
    path: 'admin', component: AdminComponent, canActivate: [ AdminGuard], //data: { pageName: 'admin' },
    children: [
        { path: '', component: AdminAccueilContentComponent },//AdminAccueilPageComponent
        { path: 'reglages', component: AdminReglagesPageComponent }, //
        { path: 'client', component: AdminClientsPageComponent }, //
        { path: 'bibliotheque', component: AdminBibliothequePageComponent } //
    ]
};
