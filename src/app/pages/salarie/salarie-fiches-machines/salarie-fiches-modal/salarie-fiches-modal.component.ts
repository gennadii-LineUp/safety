import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: "modal-header-SSF",
    template: `<ng-content></ng-content>`
})
export class ModalHeaderSSF {}


@Component({
    selector: "modal-content-SSF",
    template: `<ng-content></ng-content>`
})
export class ModalContentSSF {}


@Component({
    selector: "modal-footer-SSF",
    template: `<ng-content></ng-content>`
})
export class ModalFooterSSF {}


@Component({
    selector: 'salarie-fiches-modal',
    templateUrl: './salarie-fiches-modal.component.html',
    styleUrls: ['./salarie-fiches-modal.component.css']
})
export class SalarieFichesModalComponent  {


    // -------------------------------------------------------------------------
    // Inputs
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Outputs
    // -------------------------------------------------------------------------

    @Output()
    public onOpen = new EventEmitter(false);

    @Output()
    public onClose = new EventEmitter(false);

    @Output()
    public onSubmit = new EventEmitter(false);

    // -------------------------------------------------------------------------
    // Public properties
    // -------------------------------------------------------------------------

    public isOpened = false;

    // -------------------------------------------------------------------------
    // Private properties
    // -------------------------------------------------------------------------

    @ViewChild("modalRoot")
    public modalRoot: ElementRef;

  public backdropElement: HTMLElement;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor() {
        this.createBackDrop();
    }

    // -------------------------------------------------------------------------
    // Lifecycle Methods
    // -------------------------------------------------------------------------

    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, "");
        if (this.backdropElement && this.backdropElement.parentNode === document.body)
            document.body.removeChild(this.backdropElement);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

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

  public createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add("fade");
        this.backdropElement.classList.add("in");
        if(this.backdrop) {
            this.backdropElement.classList.add("modal-backdrop");
        }
    }

}
