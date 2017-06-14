import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
    selector: "modal-header-SSAut",
    template: `<ng-content></ng-content>`
})
export class ModalHeaderSSAut {}


@Component({
    selector: "modal-content-SSAut",
    template: `<ng-content></ng-content>`
})
export class ModalContentSSAut {}


@Component({
    selector: "modal-footer-SSAut",
    template: `<ng-content></ng-content>`
})
export class ModalFooterSSAut {}



@Component({
  selector: 'modal-autor',
  templateUrl: './modal-autor.component.html',
  styleUrls: ['./modal-autor.component.css']
})
export class SiteSalariesCreationEtap2ModalAutorComponent  {
    @Input()
    public modalClass: string;

    @Input()
    public closeOnEscape: boolean = true;

    @Input()
    public closeOnOutsideClick: boolean = true;

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

    @ViewChild("modalRoot")
    public modalRoot: ElementRef;

    private backdropElement: HTMLElement;


    constructor() {
        this.createBackDrop();
    }


    ngOnDestroy() {
        document.body.className = document.body.className.replace(/modal-open\b/, "");
        if (this.backdropElement && this.backdropElement.parentNode === document.body)
            document.body.removeChild(this.backdropElement);
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

}