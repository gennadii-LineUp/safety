import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {DataService} from "../../../../../services/DataService.service";
declare var $:any;

@Component({
    selector: "modal-header-SSAtt",
    template: `<ng-content></ng-content>`
})
export class ModalHeaderSSAtt {}


@Component({
    selector: "modal-content-SSAtt",
    template: `<ng-content></ng-content>`
})
export class ModalContentSSAtt {}


@Component({
    selector: "modal-footer-SSAtt",
    template: `<ng-content></ng-content>`
})
export class ModalFooterSSAtt {}



@Component({
  selector: 'modal-attest',
  templateUrl: './modal-attest.component.html',
  styleUrls: ['./modal-attest.component.css'],
  providers: [DataService]
})
export class SiteSalariesCreationEtap2ModalAttestComponent  {
    @Input()
    public modalClass: string;

    @Input()
    public closeOnEscape = true;

    @Input()
    public closeOnOutsideClick = true;

    @Input()
    public title: string;

    @Input()
    public hideCloseButton = false;

    @Input()
    public cancelButtonLabel: string;

    @Input()
    public submitButtonLabel: string;

    @Input()
    public backdrop:boolean = true;


    @Output()
    public onOpen = new EventEmitter(false);

    @Output()
    public onClose = new EventEmitter(false);

    @Output()
    public onSubmit = new EventEmitter(false);


    public isOpened = false;

    @ViewChild('modalRoot')
    public modalRoot: ElementRef;

    private backdropElement: HTMLElement;


    constructor(private dataService: DataService) {
        this.createBackDrop();
    }

    public tableMobileViewInit() {
        let headertext = [],
            headers = document.querySelectorAll('th'),
            tablerows = document.querySelectorAll('th'),
            tablebody = document.querySelector('tbody');
        if (document.querySelector('table')) {
            for(let i = 0; i < headers.length; i++) {
                let current = headers[i];
                headertext.push(current.textContent.replace(/\r?\n|\r/, ''));
            }
            for (let i = 0, row; row = tablebody.rows[i]; i++) {
                for (let j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute('data-th', headertext[j]);
                }
            }
        }
    }


    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        if (this.backdropElement && this.backdropElement.parentNode === document.body) {
          document.body.removeChild(this.backdropElement);
        }
    }


    open(...args: any[]) {
        if (this.isOpened)
            return;

        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        document.body.className += " modal-open";
    }

    close(...args: any[]) {
        if (!this.isOpened)
            return;

        this.isOpened = false;
        this.onClose.emit(args);
        document.body.removeChild(this.backdropElement);
        document.body.className = document.body.className.replace(/modal-open\b/, "");
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    public preventClosing(event: MouseEvent) {
        event.stopPropagation();
    }

    private createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add("fade");
        this.backdropElement.classList.add("in");
        if(this.backdrop) {
            this.backdropElement.classList.add("modal-backdrop");
        }
    }

    public datepickerViewInit() {
        //Datepicker Popups calender to Choose date
        $(() => {
            this.dataService.datepickerFranceFormat();
            $( '#attest_dateDelivrance, #attest_dateExpir' ).datepicker();
            $( '#attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'changeYear', true );
            //Pass the user selected date format
            $( '#format' ).change(() => {
                $( '#attest_dateDelivrance, #attest_dateExpir' ).datepicker( 'option', 'dateFormat', $(this).val() );
            });
        });
    }


}
