import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  startDecade: number;
  numDecades: number;
  @Input() selectedDecade: number;
  @Output() selectedDecadeChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    this.startDecade = 1900;
    this.numDecades = 12;
  }

  ngOnInit() { }

  onClick(decade: number) {
    this.selectedDecade = decade;
    this.selectedDecadeChange.emit(this.selectedDecade);
  }

}
