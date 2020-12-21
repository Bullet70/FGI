import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searching: boolean;
  searchResults: any;
  faSpinner = faSpinner;
  page: number;
  query: string;
  currentRequest: any;

  constructor(private mainService: MainService,
      private route: ActivatedRoute,
      private router: Router) {
    this.searching = null;
    this.searchResults = null;
    this.page = 0;
  }

  ngOnInit() { 
    this.route.params.subscribe((params) => {
      console.log("Search query: " + params['query']);
      this.query = params['query'];
      this.searchResults = null;
      this.doSearch(1);
    });
  }

  doSearch(page: number) {
    this.page = page;
    this.searching = true;

    if (this.currentRequest != null) {
      this.currentRequest.unsubscribe();
    }

    this.currentRequest = this.mainService.doSearch(this.query, this.page).subscribe((result) => {
      console.log(result);
      this.searchResults = result.response;
      this.searchResults.resultSet = this.searchResults.resultSet.filter(item => {
          return item.values.month != null;
      });
      this.searching = false;
      this.currentRequest = null;
    },
    (error) => {
      this.searching = false;
      this.searchResults = undefined;
    });
  }
}
