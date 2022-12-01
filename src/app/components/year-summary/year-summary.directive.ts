import {Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Directive({
    selector: '[appSummaryDirective]',
    standalone: true
})
export class YearSummaryDirective implements OnInit, OnDestroy {

    currentPosition = window.screenTop;

    constructor(
        private summaryContainer: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private _document: Document
    ) {
    }

    ngOnInit(): void {
        this._document.addEventListener('scroll', this.onContentScrolled);
    }

    ngOnDestroy() {
        this._document.removeEventListener('scroll', this.onContentScrolled);
    }

    onContentScrolled = (e) => {
        let scroll = window.pageYOffset;
        if (scroll > this.currentPosition) {
            this.renderer.setStyle(this.summaryContainer.nativeElement, 'transform', 'translateY(160%)');
        } else {
            this.renderer.setStyle(this.summaryContainer.nativeElement, 'transform', 'translateY(0%)');
        }
        this.currentPosition = scroll;
    }

}
