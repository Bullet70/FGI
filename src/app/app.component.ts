import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BookPage } from './book-page/book-page';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    bg: number = 0;
    
  faSearch = faSearch;
  faBars = faBars;
  title = 'federscherma-angular';
  pagesGeneric: number[] = [0, 1, 2, 3];
  selectedDecade: number;
  searchQuery: string;
  mobile: boolean;
  sidebarToggled: boolean = false;
  showTimeline: boolean = true;
	routeParams: any;
	viewMode: boolean = true;
	bgImage: string = 'url(\'/assets/img/sfondo-ginnasta.jpg\')';

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private service: MainService) {
    this.selectedDecade = null;
    this.searchQuery = "";
    this.mobile = false;
		
    router.events.subscribe(e => {
      if(e instanceof NavigationStart) {
      }
    });
    router.events.pipe(filter(e => e instanceof NavigationEnd), pairwise())
    .subscribe((event: any[]) => {
        if(event[1].url.startsWith('/search')) {
            this.showTimeline = false;
        } else {
            this.showTimeline = true;
        }
        service.previousUrl = event[0].urlAfterRedirects;
    });
  }

  ngOnInit() {
	}
	
	onActivation(event) {
		if(this.route.firstChild) {
			this.route.firstChild.params.subscribe(params => {
				if(params['decade']) {
					this.selectedDecade = +params['decade'];
				}
			});
		}
	}
  
  doLogout() {
	window.location.href = '/federginnastica/wp-login.php?action=logout';
  }
  
  doSearch() {
    this.router.navigateByUrl('/search/' + this.searchQuery);
  }

  toggleSidebar() {
    this.sidebarToggled = !this.sidebarToggled;
  }
  
  onSelectedDecadeChange(event) {
      console.log(event);
      this.router.navigateByUrl('list/' + event + '/0');
  }

	switchMode(mode: boolean) {
		console.log('Switching to ' + mode);
		this.service.setBookMode(mode);
	}
	
	change(image: string) {
		this.bgImage = 'url(\'/assets/img/' + image + '.jpg\')';
	}
}