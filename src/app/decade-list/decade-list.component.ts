import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { YearsModel } from '../years.model';
import { MainService } from '../main.service';

@Component({
  selector: 'decade-list',
  templateUrl: './decade-list.component.html',
  styleUrls: ['./decade-list.component.scss']
})
export class DecadeListComponent implements OnInit {
  yearOrder: number;
  decadeShown: number;
  currentPage: number;
  mobile: boolean;
  years: Map<string, number[]>;
	mode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private mainService: MainService, breakpointObserver: BreakpointObserver) {
    this.decadeShown = null;
    this.currentPage = 0;
    this.mobile = false;

    breakpointObserver.observe([Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
    
    this.loadYears();
//    mainService.getYears();
//    this.years = mainService.yearsAvailable;
//    .then(response => {
//      this.years = new Map();
//      Object.keys(response.years).forEach(key => {
//        this.years.set(key, response.years[key]);
//      });
//    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log("Decade: " + +params['decade']);
      console.log("Page: " + +params['page']);
      this.yearOrder = this.decadeShown = +params['decade'];
      this.currentPage = +params['page'];
    });
  }
  
  hasMagazine(year, month): boolean {
  	if(this.years) {
      if(month) {
//        console.log(this.years.has(''+year) ? this.years.get(''+year).filter(item => month === item) : 'have not');
        return this.years.has(''+year) && this.years.get(''+year).filter(item => month === item).length > 0;
      } else {
        return this.years.has(''+year);
      }
  	} else
  		return true;
  }

  onSelectedDecadeChange(decade: number) {
    this.decadeShown = decade;
    this.currentPage = 0;
  }

  switchToPage(page: number) {
    this.currentPage = page;
  }
  
  async loadYears() {
    await this.mainService.getYears().toPromise().then(response => {
      this.years = new Map();
      Object.keys(response.years).forEach(key => {
        this.years.set(key, response.years[key]);
      });
    });
  }
}
