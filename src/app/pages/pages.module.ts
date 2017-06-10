import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./index-page/app.component";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {AppRoutingModule} from "../services/routing.module";
import {SharedModule} from "../shared/shared.module";
import {AdminAccueilPageComponent} from './admin/admin-accueil-page/admin-accueil-page.component';
import { AdminReglagesPageComponent } from './admin/admin-reglages-page/admin-reglages-page.component';
import { AdminClientsPageComponent } from './admin/admin-clients-page/admin-clients-page.component';
import { AdminBibliothequePageComponent } from './admin/admin-bibliotheque-page/admin-bibliotheque-page.component';
import { AdminAccueilContentComponent } from './admin/admin-accueil-page/admin-accueil-content/admin-accueil-content.component';
import { ClientSitesPageComponent } from './client/client-sites-page/client-sites-page.component';
import { ClientSitesModalComponent, ModalHeaderCS, ModalContentCS, ModalFooterCS } from './client/client-sites-page/client-sites-modal/client-sites-modal.component';
import { ClientGroupesPageComponent } from './client/client-groupes-page/client-groupes-page.component';
import { ClientGroupesModalComponent, ModalHeaderCG, ModalContentCG, ModalFooterCG } from './client/client-groupes-page/client-groupes-modal/client-groupes-modal.component';
import { ClientSalariesPageComponent } from './client/client-salaries-page/client-salaries-page.component';
import { ClientProfilPageComponent } from './client/client-profil-page/client-profil-page.component';
import { ClientBibliothequePageComponent } from './client/client-bibliotheque-page/client-bibliotheque-page.component';
import { SiteAccueilPageComponent } from './site/site-accueil-page/site-accueil-page.component';
import { SiteReglagesPageComponent } from './site/site-reglages-page/site-reglages-page.component';
import { SiteReglagesModalComponent, ModalHeaderSRM, ModalContentSRM, ModalFooterSRM } from './site/site-reglages-page/site-reglages-modal/site-reglages-modal.component';
import { SiteFichiersPageComponent } from './site/site-fichiers-page/site-fichiers-page.component';
import { SiteFichiersModalComponent, ModalHeaderSF, ModalContentSF, ModalFooterSF } from './site/site-fichiers-page/site-fichiers-modal/site-fichiers-modal.component';
import { SiteParcPageComponent } from './site/site-parc-page/site-parc-page.component';
import { SiteParcModalMachineComponent, ModalHeaderSPMM, ModalContentSPMM, ModalFooterSPMM } from './site/site-parc-page/site-parc-modal-machine/site-parc-modal-machine.component';
import { SiteParcModalEnginComponent, ModalHeaderSPME, ModalContentSPME, ModalFooterSPME } from './site/site-parc-page/site-parc-modal-engin/site-parc-modal-engin.component';
import { SiteParcModalDetailsComponent, ModalHeaderSPMD, ModalContentSPMD, ModalFooterSPMD } from './site/site-parc-page/site-parc-modal-details/site-parc-modal-details.component';
import { SiteSalariesPageComponent } from './site/site-salaries-page/site-salaries-page.component';
import { SiteSalariesCreationComponent } from './site/site-salaries-page/site-salaries-creation/site-salaries-creation.component';
import { LoginStartComponent } from './login/login-start/login-start.component';
import { RappelerLeMotDePasseComponent } from './login/login-rappeler/login-rappeler.component';
import { AdminBibliothequeModalComponent, ModalHeaderAB, ModalContentAB, ModalFooterAB } from './admin/admin-bibliotheque-page/admin-bibliotheque-modal/admin-bibliotheque-modal.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { SiteComponent } from './site/site.component';
import {InnerPagesComponent} from './inner-pages/inner-pages/inner-pages.component';
import { AdminClientAjouterComponent } from './admin/admin-clients-page/admin-client-ajouter/admin-client-ajouter.component';


@NgModule({
    imports: [
        CommonModule, AppRoutingModule, SharedModule, FormsModule
    ],
    declarations: [
        AppComponent,
        NotFoundPageComponent,
        AdminAccueilPageComponent,        AdminAccueilContentComponent,
        AdminReglagesPageComponent,
        AdminClientsPageComponent,        AdminClientAjouterComponent,
        AdminBibliothequePageComponent,   AdminBibliothequeModalComponent, ModalHeaderAB, ModalContentAB, ModalFooterAB,
        ClientSitesPageComponent,         ClientSitesModalComponent, ModalHeaderCS, ModalContentCS, ModalFooterCS,
        ClientGroupesPageComponent,       ClientGroupesModalComponent,ModalHeaderCG, ModalContentCG, ModalFooterCG,
        ClientSalariesPageComponent,
        ClientProfilPageComponent,
        ClientBibliothequePageComponent,
        SiteAccueilPageComponent,
        SiteReglagesPageComponent,        SiteReglagesModalComponent,ModalHeaderSRM, ModalContentSRM, ModalFooterSRM,
        SiteFichiersPageComponent,        SiteFichiersModalComponent, ModalHeaderSF, ModalContentSF, ModalFooterSF,
        SiteParcPageComponent,
        SiteParcModalMachineComponent,    ModalHeaderSPMM, ModalContentSPMM, ModalFooterSPMM,
        SiteParcModalEnginComponent,      ModalHeaderSPME, ModalContentSPME, ModalFooterSPME,
        SiteParcModalDetailsComponent,    ModalHeaderSPMD, ModalContentSPMD, ModalFooterSPMD,
        SiteSalariesPageComponent,        SiteSalariesCreationComponent,
        LoginStartComponent,
        RappelerLeMotDePasseComponent,

        //ModalHeader, ModalContent, ModalFooter,
        AdminComponent,
        ClientComponent,
        SiteComponent,
        InnerPagesComponent,

    ],
    exports: [
        AppComponent,
        NotFoundPageComponent,
        AdminAccueilPageComponent,        AdminAccueilContentComponent,
        AdminReglagesPageComponent,
        AdminClientsPageComponent,        AdminClientAjouterComponent,
        AdminBibliothequePageComponent,   AdminBibliothequeModalComponent, ModalHeaderAB, ModalContentAB, ModalFooterAB,
        ClientSitesPageComponent,         ClientSitesModalComponent, ModalHeaderCS, ModalContentCS, ModalFooterCS,
        ClientGroupesPageComponent,       ClientGroupesModalComponent,ModalHeaderCG, ModalContentCG, ModalFooterCG,
        ClientSalariesPageComponent,
        ClientProfilPageComponent,
        ClientBibliothequePageComponent,
        SiteAccueilPageComponent,
        SiteReglagesPageComponent,        SiteReglagesModalComponent,ModalHeaderSRM, ModalContentSRM, ModalFooterSRM,
        SiteFichiersPageComponent,        SiteFichiersModalComponent,ModalHeaderSF, ModalContentSF, ModalFooterSF,
        SiteParcPageComponent,
        SiteParcModalMachineComponent,    ModalHeaderSPMM, ModalContentSPMM, ModalFooterSPMM,
        SiteParcModalEnginComponent, ModalHeaderSPME, ModalContentSPME, ModalFooterSPME,
        SiteParcModalDetailsComponent,    ModalHeaderSPMD, ModalContentSPMD, ModalFooterSPMD,
        SiteSalariesPageComponent,        SiteSalariesCreationComponent,
        LoginStartComponent,
        RappelerLeMotDePasseComponent,

        //ModalHeader, ModalContent, ModalFooter,
        AdminComponent,
        ClientComponent,
        SiteComponent,
        InnerPagesComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]

})
export class PagesModule { }
