import {Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../../../services/DataService.service';
declare var $: any;

@Component({
    selector: 'modal-header-SPMM',
    template: `<ng-content></ng-content>`
})
export class ModalHeaderSPMM {}


@Component({
    selector: 'modal-content-SPMM',
    template: `<ng-content></ng-content>`,
  providers: [DataService]
})
export class ModalContentSPMM {
  constructor(public dataService: DataService) {}
}


@Component({
    selector: 'modal-footer-SPMM',
    template: `<ng-content></ng-content>`
})
export class ModalFooterSPMM {}


@Component({
    selector: 'site-parc-modal-machine',
    templateUrl: './site-parc-modal-machine.component.html',
    styleUrls: ['./site-parc-modal-machine.component.css'],
  providers: [DataService]
})
export class SiteParcModalMachineComponent implements OnDestroy { // extends SiteParcPageComponent
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
    public backdrop = true;


    @Output()
    public onOpen = new EventEmitter(false);

    @Output()
    public onClose = new EventEmitter(false);

    @Output()
    public onSubmit = new EventEmitter(false);


    public isOpened = false;

    @ViewChild('modalRoot')
    public modalRoot: ElementRef;

  public backdropElement: HTMLElement;


    constructor(public dataService: DataService) {
       // super();
        this.createBackDrop();
    }


    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, '');
        if (this.backdropElement && this.backdropElement.parentNode === document.body) {
            document.body.removeChild(this.backdropElement);
        }
    }


    open(...args: any[]) {
        if (this.isOpened) { return; }

        this.isOpened = true;
        this.onOpen.emit(args);
        document.body.appendChild(this.backdropElement);
        window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
        document.body.className += ' modal-open';
    }

    close(...args: any[]) {
        if (!this.isOpened) { return; }

        this.isOpened = false;
        this.onClose.emit(args);
        document.body.removeChild(this.backdropElement);
        document.body.className = document.body.className.replace(/modal-open\b/, '');
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    public preventClosing(event: MouseEvent) {
        event.stopPropagation();
    }

  public createBackDrop() {
        this.backdropElement = document.createElement('div');
        this.backdropElement.classList.add('fade');
        this.backdropElement.classList.add('in');
        if (this.backdrop) {
            this.backdropElement.classList.add('modal-backdrop');
        }
    }

}
