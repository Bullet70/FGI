import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { filter, pairwise, map } from 'rxjs/operators';
import { BookPage } from './book-page/book-page';
import { environment } from '../environments/environment';
import { YearsModel } from './years.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private API_URI: string = "/federginnastica/wp-admin/admin-ajax.php";
  previousUrl: string;
	bookMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	public viewMode: Observable<boolean> = this.bookMode.asObservable();
  
  public yearsAvailable: any;

  constructor(private http: HttpClient, router: Router) {
  	//console.log('servizio costruito');
  	//this.getYears();
  }

  doSearch(query: string, page: number): Observable<any> {
    let searchQuery = "?action=search&default=" + query + "&name=ginnastica&type=simple&facet=true&results=true&requestedPage=" + page;
		return this.http.get(this.API_URI + searchQuery);
  }

	getOldBookPagesArray(year: number, month: number): Observable<any> {
		let body = 'action=page_check&y='+year+'&m='+month;
		let options = {
		    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
		};
		return this.http.post(this.API_URI, body, options);
	}

  getBookPagesArray(year: number, month: number): Observable<any> {	
		let body = 'action=page_check&y='+year+'&m='+(month + 1);
		let options = {
		    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
		};
		return this.http.post<any>('/lunar/ginnastica/magazinePages.json', body, options).pipe(map(response => {
			let urls: string[] = [];
			let r: string[] = response.stringList;
			for(let x = 0; x < r.length; x++) {
				urls.push('/lunar/page/ginnastica/' + r[x]);
			}
			return urls;
		}));
//		return this.http.post(this.API_URI, body, options);
  }
  
  getYears(): Observable<any> {
		return this.http.get<any>('/lunar/ginnastica/realYears.json');
  }

	setBookMode(mode: boolean) {
		this.bookMode.next(mode);
	}
}
