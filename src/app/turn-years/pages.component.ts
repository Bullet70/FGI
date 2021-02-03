import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  @Input() selectedYears: number[];
	@Input() years: Map<string, number[]>;
	@Output() selection: EventEmitter<number> = new EventEmitter<number>();
	months: string[] = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
	firstSemester: number[] = [0, 1, 2, 3, 4, 5];
	secondSemester: number[] = [6, 7, 8, 9, 10, 11];

  constructor() { }
  
  hasMagazine(year, month): boolean {
		if(this.years) {
      if(month) {
        return this.years.has(''+year) && this.years.get(''+year).filter(item => (month + 1) == item).length > 0;
      } else {
        return this.years.has(''+year);
      }
  	} else
  		return true;
  }
}