import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';
import { BookPage } from '../book-page/book-page';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { faSpinner, faExclamationTriangle, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
declare var $: any;

@Component({
  selector: 'browser-viewer',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  faSpinner = faSpinner;
  faExclamationTriangle = faExclamationTriangle;
  decade: number;
  year: number;
  month: number;
  currentPage: number = 1;
	img: string[];
	loaded: string[];
  state: number;
  zoomedPage: string;
  prevPageIcon = faAngleLeft;
  referrer: string;
	mode: boolean;

  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) {
    this.state = 0;
    this.zoomedPage = null;
		this.mainService.viewMode.subscribe(viewMode => {
			this.mode = viewMode;
		});
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.year = +params["year"];
      this.month = +params["month"];
      this.currentPage = +params["page"];
    });
  }

  onPageClick(pageNum) {
		this.zoomedPage = pageNum;
  }

	changeState(state: number) {
		this.state = state;
	}
  
  goBack() {
		const previousUrl = this.mainService.previousUrl;
		if(previousUrl && previousUrl.startsWith('/years')) {
			this.router.navigateByUrl('/years/' + Math.floor((this.year - 1900) / 10) + '/' + (2 + ((this.year - 1900) % 10) * 2));
		} else {
			this.router.navigateByUrl(previousUrl);
		}
  }
}