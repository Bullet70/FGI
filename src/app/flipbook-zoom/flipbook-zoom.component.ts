import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'flipbook-zoom',
  templateUrl: './flipbook-zoom.component.html',
  styleUrls: ['./flipbook-zoom.component.scss']
})
export class FlipbookZoomComponent implements OnInit {
  backIcon = faArrowLeft;

  @Input() url: string;
  @Output() onBackClick: any = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.onBackClick.emit();
  }

}
