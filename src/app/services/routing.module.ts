import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartComponent} from '../pages/login/login-start/login-start.component';
import {RappelerLeMotDePasseComponent} from 'app/pages/login/login-rappeler/login-rappeler.component';
import {AdminComponent} from '../pages/admin/admin.component';
import {ClientComponent} from '../pages/client/client.component';
import {AuthGuard} from 'app/guards/auth-guards.service';
import {AdminGuard} from '../guards/admin-guard.service';
import {ClientGuard} from '../guards/client-guard.service';
import {AdminAccueilContentComponent} from '../pages/admin/admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import {AdminClientAjouterComponent} from '../pages/admin/admin-clients-page/admin-client-ajouter/admin-client-ajouter.component';
import {AdminReglagesPageComponent} from 'app/pages/admin/admin-reglages-page/admin-reglages-page.component';
import {AdminBibliothequePageComponent} from '../pages/admin/admin-bibliotheque-page/admin-bibliotheque-page.component';
import {ClientGroupesPageComponent} from '../pages/client/client-groupes-page/client-groupes-page.component';
import {ClientSalariesPageComponent} from '../pages/client/client-salaries-page/client-salaries-page.component';
import {ClientBibliothequePageComponent} from '../pages/client/client-bibliotheque-page/client-bibliotheque-page.component';
import {AdminClientsPageComponent} from '../pages/admin/admin-clients-page/admin-clients-page.component';
import {ClientSitesPageComponent} from '../pages/client/client-sites-page/client-sites-page.component';
import {ClientProfilPageComponent} from '../pages/client/client-profil-page/client-profil-page.component';
import {SiteComponent} from '../pages/site/site.component';
import {SiteAccueilPageComponent} from 'app/pages/site/site-accueil-page/site-accueil-page.component';
import {SiteReglagesPageComponent} from '../pages/site/site-reglages-page/site-reglages-page.component';
import {SiteFichiersPageComponent} from '../pages/site/site-fichiers-page/site-fichiers-page.component';
import {SiteParcPageComponent} from '../pages/site/site-parc-page/site-parc-page.component';
import {SiteSalariesPageComponent} from '../pages/site/site-salaries-page/site-salaries-page.component';
import {SiteSalariesCreationComponent} from 'app/pages/site/site-salaries-page/site-salaries-creation/site-salaries-creation.component';
import {SiteSalariesCreationEtap2Component} from '../pages/site/site-salaries-page/site-salaries-creation-etap2/site-salaries-creation-etap2.component';
import {SalarieComponent} from '../pages/salarie/salarie.component';
import {SalarieProfilComponent} from '../pages/salarie/salarie-profil/salarie-profil.component';
import {SalarieFichiersComponent} from '../pages/salarie/salarie-fichiers/salarie-fichiers.component';
import {SalarieFichesMachinesComponent} from '../pages/salarie/salarie-fiches-machines/salarie-fiches-machines.component';
import {SalarieVisiteMedicComponent} from '../pages/salarie/salarie-visite-medic/salarie-visite-medic.component';
import {SalarieCacesComponent} from '../pages/salarie/salarie-caces/salarie-caces.component';
import {SalarieAutorisComponent} from '../pages/salarie/salarie-autoris/salarie-autoris.component';
import {SalarieAttestationsComponent} from '../pages/salarie/salarie-attestations/salarie-attestations.component';
import {EmployeeNullGuard} from '../guards/employee-null-guard.service';
import {DataService} from './DataService.service';
import {AdminAsClientGuard} from '../guards/admin-as-client-guard.service';


const routes: Routes = [
   // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '', component: LoginStartComponent },
    { path: 'rappeler-le-mot-de-passe', component: RappelerLeMotDePasseComponent },
    { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard, AdminGuard],
        children: [
                { path: '', component: AdminAccueilContentComponent }, //AdminAccueilPageComponent
                { path: 'reglages', component: AdminReglagesPageComponent },
                { path: 'client', component: AdminClientsPageComponent},
                { path: 'client/ajouter-un-client', component: AdminClientAjouterComponent },
                { path: 'bibliotheque', component: AdminBibliothequePageComponent }
        ]
    },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard, ClientGuard],
        children: [
                { path: '', component: ClientSitesPageComponent  },
                { path: 'groupes', component: ClientGroupesPageComponent },
                { path: 'employees', component: ClientSalariesPageComponent },//salarie
                { path: 'profil', component: ClientProfilPageComponent },
                { path: 'bibliotheque', component: ClientBibliothequePageComponent }
        ]
    },
    { path: 'site/:id_site', component: SiteComponent, //canActivate: [AuthGuard, ClientGuard],
        children: [
                { path: '', component: SiteAccueilPageComponent },
                { path: 'reglages', component: SiteReglagesPageComponent },
                { path: 'fichiers', component: SiteFichiersPageComponent },
                { path: 'parc', component: SiteParcPageComponent },
                { path: 'salaries', component: SiteSalariesPageComponent },
                { path: 'ajouter-un-salarie-etap1', component: SiteSalariesCreationComponent },
                { path: 'salarie/ajouter-un-salarie-etap2', component: SiteSalariesCreationEtap2Component } //path: 'salarie/ajouter-un-salarie-etap2'
        ]
    },
    { path: 'sfsalarie', component: SalarieComponent, canActivate: [AuthGuard, EmployeeNullGuard],
        children: [
            { path: '', component: SalarieProfilComponent },
            { path: 'fichiers', component: SalarieFichiersComponent },
            { path: 'fiches-machines', component: SalarieFichesMachinesComponent },
            { path: 'visite-medicale', component: SalarieVisiteMedicComponent },
            { path: 'caces', component: SalarieCacesComponent },
            { path: 'attestations', component: SalarieAttestationsComponent },
            { path: 'autorisations-conduite', component: SalarieAutorisComponent }
        ]
    },
    { path: '**', component: LoginStartComponent }
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        AuthGuard, AdminGuard, ClientGuard, AdminAsClientGuard, EmployeeNullGuard, DataService
    ]
})
export class AppRoutingModule {}
