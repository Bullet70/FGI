import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { YearsModel } from './years.model';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MainService } from './main.service';

@Injectable()
export class YearsResolver implements Resolve<Map<string, number[]>> {
	
	constructor(private service: MainService) {}
	
	resolve(): Observable<Map<string, number[]>> {
		return this.service.getYears().pipe(first(), map((response: any) => {
      let years = new Map();
      Object.keys(response.years).forEach(key => {
        years.set(key, response.years[key]);
      });
			console.log(years);
			return years;
		}));
	}
}