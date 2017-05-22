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
import {AdminClientsContentComponent} from '../pages/admin/admin-clients-page/admin-clients-content/admin-clients-content.component';
import {AdminBibliothequeContentComponent} from '../pages/admin/admin-bibliotheque-page/admin-bibliotheque-content/admin-bibliotheque-content.component';
import {AdminReglagesContentComponent} from '../pages/admin/admin-reglages-page/admin-reglages-content/admin-reglages-content.component';
import {ClientSalariesContentComponent} from 'app/pages/client/client-salaries-page/client-salaries-content/client-salaries-content.component';
import {ClientSitesContentComponent} from '../pages/client/client-sites-page/client-sites-content/client-sites-content.component';
import {ClientGroupesContentComponent} from '../pages/client/client-groupes-page/client-groupes-content/client-groupes-content.component';
import {ClientBibliothequeContentComponent} from '../pages/client/client-bibliotheque-page/client-bibliotheque-content/client-bibliotheque-content.component';
// import {SiteRoutingModule} from '../pages/site/site-routing.module';
import {ClientProfilContentComponent} from 'app/pages/client/client-profil-page/client-profil-content/client-profil-content.component';


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
                { path: 'accueil', component: AdminAccueilContentComponent },//AdminAccueilPageComponent
                { path: 'reglages', component: AdminReglagesContentComponent }, //AdminReglagesPageComponent
                { path: 'client', component: AdminClientsContentComponent }, //AdminClientsPageComponent
                { path: 'bibliotheque', component: AdminBibliothequeContentComponent }, //AdminBibliothequePageComponent
                { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard, ClientGuard],
        children: [
                { path: 'accueil', component: ClientSitesContentComponent  }, //ClientSitesPageComponent
                { path: 'groupes', component: ClientGroupesContentComponent }, //ClientGroupesPageComponent
                { path: 'salaries', component: ClientSalariesContentComponent }, //ClientSalariesPageComponent
                { path: 'profil', component: ClientProfilContentComponent }, //ClientProfilPageComponent
                { path: 'bibliotheque', component: ClientBibliothequeContentComponent }, //ClientBibliothequePageComponent
                { path: '', redirectTo: 'accueil', pathMatch: 'full' }
        ]
    }
    // { path: 'site/accueil', component: SiteAccueilPageComponent },
    // { path: 'site/reglages', component: SiteReglagesPageComponent },
    // { path: 'site/fichiers', component: SiteFichiersPageComponent },
    // { path: 'site/parc', component: SiteParcPageComponent },
    // { path: 'site/parc', component: SiteParcPageComponent },
    // { path: 'site/salaries', component: SiteSalariesPageComponent }
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



