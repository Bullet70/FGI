import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { BookPage } from '../book-page/book-page';

@Component({
  selector: 'flipbook-generic',
  templateUrl: './flipbook-generic.component.html',
  styleUrls: ['./flipbook-generic.component.scss']
})
export class FlipbookGenericComponent implements OnInit, OnChanges {
  FLIPBOOK_SPEED: number = 1000;

  @Input() template: TemplateRef<any>;    // Template del contenuto della pagina dipendente da parametro pnum
  @Input() numPages: number;
  @Input() context: any;
  @Input() buttonsOnBottom: boolean = false;
  @Input() currentPage: number;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPageClick: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    
    // Cambia pagina se ci sono effettivi cambiamenti, evitando loop
    if (changes.currentPage != undefined &&
      this.currentPage != changes.currentPage.previousValue &&
      this.currentPage != this.currentPageR) {
        console.log("GoToPage " + this.currentPage);
        this.goToPage(this.currentPage);
    }
  }

  currentPageL: number;   // Pagina mostrata correntemente a sx
  currentPageR: number;   // Pagina mostrata correntemente a dx
  flipping: number;       // -1 = DX -> SX; 0 = Nessuna azione; 1 = SX -> DX
  mobile: boolean;

  prevPageIcon = faAngleLeft;
  nextPageIcon = faAngleRight;

  constructor() {
    this.currentPageL = -1;
    this.currentPageR = 0;
    this.flipping = 0;
    this.mobile = false;
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.currentPage != null) {
        this.goToPage(this.currentPage);
      }
    }, this.FLIPBOOK_SPEED);
  }

  isCurrentPage(what): boolean {
    switch (what) {
      case 'last':
        return this.currentPageR >= this.numPages - 1;
      case 'first':
        return this.currentPageR === 0;

      default:
        return false;
    }
  }

  isPageShowable(pageNum: number): boolean {
    return pageNum == this.currentPageL || pageNum == this.currentPageR;
  }

  goToPage(pageNum: number) {
    if (pageNum == this.currentPageR) return;

    if (this.mobile == false && pageNum % 2 != 0) {
      pageNum = pageNum + 1;
    }
    this.flipping = (this.currentPageR < pageNum) ? 1 : -1;

    if (this.flipping > 0) {
      this.currentPageR = pageNum;
    } else {
      this.currentPageL = pageNum - 1;
    }

    setTimeout(() => {
      if (this.flipping > 0) {
        this.currentPageL = this.currentPageR - 1;
      } else {
        this.currentPageR = this.currentPageL + 1;
      }

      this.flipping = 0;

      this.currentPage = this.currentPageR;
      this.currentPageChange.emit(this.currentPage);
    }, this.FLIPBOOK_SPEED);
  }

  turnTo(action: any) {
    if (this.flipping != 0 && this.currentPage == this.currentPageR) return;

    let offset = (this.mobile == false) ? 2 : 1;

    switch (action) {
      case 'next':
        this.goToPage(this.currentPageR + offset);
        break;

      case 'prev':
        this.goToPage(this.currentPageR - offset);
        break;
    }
  }

  getPageClass(pnum): string {
    if (pnum == this.currentPageL) return 'back';
    if (pnum == this.currentPageR) return 'front';

    return '';
  }

  getRange() {
    return new Array(this.numPages);
  }
}
