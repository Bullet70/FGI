import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { BookPage } from '../book-page/book-page';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { faSpinner, faExclamationTriangle, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.scss']
})
export class BookViewerComponent implements OnInit {
  faSpinner = faSpinner;
  faExclamationTriangle = faExclamationTriangle;
  decade: number;
  @Input() year: number;
  @Input() month: number;
  @Input() currentPage: number;
	@Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  pages: BookPage[] = [];
  @Output() state: EventEmitter<number> = new EventEmitter<number>();
  @Output() zoomedPage: EventEmitter<string> = new EventEmitter<string>();
  prevPageIcon = faAngleLeft;
  referrer: string;

  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) {
    console.log('BOOKVIEWER Constructor');
  }

  ngOnInit() {
//    this.route.params.subscribe((params) => {
//      this.year = +params["year"];
//      this.month = +params["month"];
//      this.currentPage = +params["page"];
		console.log('Componente creato ed in fase di inizializzazione');
      this.mainService.getOldBookPagesArray(this.year, this.month).subscribe((pages) => {
        let odd = pages.length % 2;
        pages.forEach((p, index) => {
//            if(index == 1 || (odd == 0 && index == pages.length - 1)) {
//                this.pages.push({
//                    url: 'https://dev.esinware.it/scherma/assets/img/blankvintage.jpg',
//                    loaded: false,
//                    image: new Image()
//                });
//            }
            this.pages.push({
              url: p,
              loaded: false,
              image: new Image()
            });
        });
  
        this.pages.forEach((p) => {
          p.image.src = p.url;
          p.image.onload = () => {
            p.loaded = true;
          }
        });
        
        if(this.currentPage) {
            if((this.pages.length % 2) == 0)
                this.currentPage = this.currentPage + 1;
        }
				console.log('Pagine caricate');
        this.state.emit(1);
      });
//    });
  }

  onPageClick(pageNum) {
		console.log('Zoom for ' + pageNum + ' page');
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
