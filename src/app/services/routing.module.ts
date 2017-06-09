import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartComponent} from '../pages/login/login-start/login-start.component';
import {RappelerLeMotDePasseComponent} from 'app/pages/login/login-rappeler/login-rappeler.component';
import {AdminComponent} from '../pages/admin/admin.component';
import {ClientComponent} from '../pages/client/client.component';
import {AuthGuard} from 'app/guards/auth-guards.service';
import {AdminGuard} from '../guards/admin-guard.service';
import {ClientGuard} from '../guards/client-guard.service';

// import {AdminRoutingModule} from '../pages/admin/admin-routing.module';
// import {AppComponent} from '../pages/index-page/app.component';
// import {ClientRoutingModule} from '../pages/client/client-routing.module';
// import {InnerPagesComponent} from '../pages/inner-pages/inner-pages/inner-pages.component';
import {AdminAccueilContentComponent} from '../pages/admin/admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
// import {SiteRoutingModule} from '../pages/site/site-routing.module';
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


// const routes: Routes = [
//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: LoginStartComponent },
//     { path: 'login_', component: RappelerLeMotDePasseComponent },
//     { path: 'admin/accueil',  component: AdminAccueilPageComponent },
//     { path: 'admin/reglages',  component: AdminReglagesPageComponent },
//     { path: 'admin/client', component: AdminClientsPageComponent },
//     { path: 'admin/bibliotheque', component: AdminBibliothequePageComponent },
//     { path: 'client/accueil', component: ClientSitesPageComponent },
//     { path: 'client/groupes', component: ClientGroupesPageComponent },
//     { path: 'client/salaries', component: ClientSalariesPageComponent },
//     { path: 'client/profil', component: ClientProfilPageComponent },
//     { path: 'client/bibliotheque', component: ClientBibliothequePageComponent },
//     { path: 'site/accueil', component: SiteAccueilPageComponent },
//     { path: 'site/reglages', component: SiteReglagesPageComponent },
//     { path: 'site/fichiers', component: SiteFichiersPageComponent },
//     { path: 'site/parc', component: SiteParcPageComponent },
//     { path: 'site/parc', component: SiteParcPageComponent },
//     { path: 'site/salaries', component: SiteSalariesPageComponent }
// ];


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginStartComponent },
    { path: 'login/rappeler-le-mot-de-passe', component: RappelerLeMotDePasseComponent },
    { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard, AdminGuard],
        children: [
                { path: 'accueil', component: AdminAccueilContentComponent }, //AdminAccueilPageComponent
                { path: 'reglages', component: AdminReglagesPageComponent },
                { path: 'client', component: AdminClientsPageComponent},
                { path: 'client/ajouter-un-client', component: AdminClientAjouterComponent },
                { path: 'bibliotheque', component: AdminBibliothequePageComponent },
                { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard, ClientGuard],
        children: [
                { path: 'accueil', component: ClientSitesPageComponent  },
                { path: 'groupes', component: ClientGroupesPageComponent },
                { path: 'salaries', component: ClientSalariesPageComponent },
                { path: 'profil', component: ClientProfilPageComponent },
                { path: 'bibliotheque', component: ClientBibliothequePageComponent },
                { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    },
    { path: 'site', component: SiteComponent, //canActivate: [AuthGuard, ClientGuard],
        children: [
                { path: 'accueil', component: SiteAccueilPageComponent },
                { path: 'reglages', component: SiteReglagesPageComponent },
                { path: 'fichiers', component: SiteFichiersPageComponent },
                { path: 'parc', component: SiteParcPageComponent },
                { path: 'salaries', component: SiteSalariesPageComponent },
                { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    },
            { path: '**', component: LoginStartComponent }
];


// const routes: Routes = [
//     { path: '', component: AppComponent, children: [
//         { path: '',
//             component: InnerPagesComponent,
//             canActivate: [AuthGuard],
//             children: [
//                 AdminRoutingModule,
//                 ClientRoutingModule  ]
//         },
//         { path: 'login', component: LoginStartComponent},
//         { path: 'login/rappeler-le-mot-de-passe', component: RappelerLeMotDePasseComponent },
//     ]
//     }//,
//    // { path: '', redirectTo: 'login', pathMatch: 'full'}
// ];



// const routes: Routes = [
//     { path: '', component: McComponent, children: [
//         { path: '',
//             component: InnerPagesComponent,
//             canActivate: [AuthGuard],
//             children: [
//                 userRoutes,
//                 taskRoutes  ]
//         },
//         { path: 'login',   component: LoginComponent}
//     ]
//     },
//     { path: '', redirectTo: 'login', pathMatch: 'full'}
// ]


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        AuthGuard, AdminGuard, ClientGuard
    ]
})
export class AppRoutingModule {}



