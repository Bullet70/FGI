import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { BookPage } from '../book-page/book-page';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { faSpinner, faExclamationTriangle, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';
declare var $: any;

@Component({
  selector: 'app-turn-viewer',
  templateUrl: './turn-viewer.component.html',
  styleUrls: ['./turn-viewer.component.scss']
})
export class TurnViewerComponent implements OnInit, OnDestroy {
//  faSpinner = faSpinner;
//  faExclamationTriangle = faExclamationTriangle;
	
  decade: number;
  @Input() year: number;
  @Input() month: number;
  @Input() currentPage: number = 0;
	@Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
	img: string[];
	loaded: string[];
  @Output() state: EventEmitter<number> = new EventEmitter<number>();
  @Output() zoomedPage: EventEmitter<string> = new EventEmitter<string>();
  prevPageIcon = faAngleLeft;
  referrer: string;

  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit() {
//    this.route.params.subscribe((params) => {
//      this.year = +params["year"];
//      this.month = +params["month"];
//      this.currentPage = +params["page"];
      this.mainService.getBookPagesArray(this.year, this.month).subscribe(pages => {
        this.img = pages;
				this.state.emit(1);
				this.loaded = new Array(this.img.length);
				let start = (this.currentPage > 2) ? (this.currentPage - 2) : 0;
				for(var index = start; index <= start + 5; index++) {
					this.loaded[index] = this.img[index];
				}
				let that = this;
				$(window).ready(function() {
					var height = 620;
					if(that.year > 1950) {
						height = 580;
					}
					$('#book').turn({
						pages: that.img.length,
						page: that.currentPage + 1,
						autocenter: true,
						elevation: 20,
						duration: 1500,
						height: height
					});
					$('#book').bind('turning', function(event, page) {
						console.log('Turning for ' + page);
						$('#book').append('<audio autoplay><source src=\"/assets/audio/flip.mp3\" type=\"audio/mpeg\"/></audio>');
					  that.addPage(page, $(this));
					});
					$('#book').bind('turned', function(event, page) {
						if(page > 1 && page < that.img.length) {
							$('.previous').removeClass('hidden');
							$('.next').removeClass('hidden');
						} else if(page == 1) {
							$('.previous').addClass('hidden');
						} else if(page == that.img.length) {
							$('.next').addClass('hidden')
						}
//						$('audio').remove();
					});
					var previous = $('<div class=\"previous\" style=\"max-height: ' + height + 'px\">');
					if(that.currentPage == 0)
						previous.addClass('hidden');
					var next = $('<div class=\"next\" style=\"max-height: ' + height + 'px\">');
					if(that.currentPage == (that.img.length - 1))
						next.addClass('hidden');
					$('#book').prepend(previous).append(next);
					previous.click(function() {
						that.currentPage = that.currentPage - 1;
						that.currentPageChange.emit(that.currentPage);
						$('#book').turn('previous');
					});
					next.click(function() {
						that.currentPage = that.currentPage + 1;
						that.currentPageChange.emit(that.currentPage);
						$('#book').turn('next');
					});
					$('.page-wrapper div[id^=\'page-\'] img').on('click', function() {
						that.onPageClick($(this).attr('src'));
					});
      	});
			});
//    });
  }

	ngOnDestroy() {
		console.log('Destroying new browser');
//		$('#book').turn('destroy');
//		$('.previous, .next').remove();
	}

	addPage(page, book) {
		var range = book.turn('range', page);
		for(page = range[0]; page <= range[1]; page++) {
			if(!book.turn('hasPage', page)) {
				var element = $('<div />', {'class': 'page ' + ((page%2==0) ? 'odd' : 'even'), 'id': 'page-'+page});
	    	book.turn('addPage', element, page);
				element.html('<img src="' + this.img[page - 1] + '"/>');
			} else {
				console.log('Already loaded');
			}
		}
	}

  onPageClick(pageNum) {
//		if(pageNum == null) {
//			$('#flipbook').turn('page', this.zoomedPage + 1);
//		}
		this.zoomedPage.emit(pageNum);
  }
  
  goBack() {
      const previousUrl = this.mainService.previousUrl;
      if(previousUrl && previousUrl.startsWith('/list')) {
          this.router.navigateByUrl('/list/' + Math.floor((this.year - 1900) / 10) + '/' + (((this.year % 10) * 2) + 1));
      } else {
          this.router.navigateByUrl(previousUrl);
      }
  }

}
