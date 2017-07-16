import { Component, OnInit } from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error/error-message-handler.service';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-client-bibliotheque-page',
  templateUrl: './client-bibliotheque-page.component.html',
  styleUrls: ['./client-bibliotheque-page.component.css'],
  providers: [ClientService]
})
export class ClientBibliothequePageComponent implements OnInit {
    loading = true;
    errorLoad = '';
    links = [];

  constructor(private errorMessageHandlerService: ErrorMessageHandlerService,
              private clientService: ClientService) { }

  ngOnInit() {
    this.getBibliothequesFunction();
  }

  public getBibliothequesFunction() {
    this.loading = true;

    this.clientService.getBibliotheques()
      .subscribe(result => {
        if (result) {
          this.cancellErrorMessage();
          console.log(result);
          this.links = result.items;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorLoad = this.errorMessageHandlerService.checkErrorStatus(err);
      });
  }

  openLinkInNewWindowFunction(link) {
    window.open(link, '_blank');
  }

  private cancellErrorMessage() {
        this.loading = false;
        this.errorLoad = '';
    }

}
