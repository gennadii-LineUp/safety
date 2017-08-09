import { Component, OnInit } from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {ClientService} from '../../../services/client/client.service';
import {BackendService} from '../../../services/backend/backend.service';
import {BasePageComponent} from '../../base/base-page.component';

@Component({
  selector: 'app-client-bibliotheque-page',
  templateUrl: './client-bibliotheque-page.component.html',
  styleUrls: ['./client-bibliotheque-page.component.css'],
  providers: [ClientService, BackendService ]
})
export class ClientBibliothequePageComponent  extends BasePageComponent implements OnInit {
    loading = true;
    errorLoad = '';
    links = [];

  constructor(public errorMessageHandlerService: ErrorMessageHandlerService,
              public clientService: ClientService,
              public backendService: BackendService) { super(); }

  ngOnInit() {
    this.getBibliothequesFunction();
  }

  public getBibliothequesFunction() {
    this.loading = true;

    this.doRequest(this.clientService, 'getBibliotheques', null, result => {
          this.cancellErrorMessage();
          console.log(result);
          this.links = result.items;
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  openLinkInNewWindowFunction(link) {
    window.open(link, '_blank');
  }

  public cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
