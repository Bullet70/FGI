import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookPage } from '../book-page/book-page';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'flipbook-bookpage',
  templateUrl: './flipbook-bookpage.component.html',
  styleUrls: ['./flipbook-bookpage.component.scss']
})
export class FlipbookBookPageComponent implements OnInit {
  faSpinner = faSpinner;
  
  @Input() image: BookPage;
  @Input() pageNum: number;
  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onPageClick() {
    if (this.pageNum != undefined) {
//      this.onClick.emit(this.pageNum);
			this.onClick.emit(this.image.url);
    }
  }
}
