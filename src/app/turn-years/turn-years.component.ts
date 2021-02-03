import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewChecked } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { YearsModel } from '../years.model';
import { PagesComponent } from './pages.component';
import { MainService } from '../main.service';
import { environment } from '../../environments/environment';
declare var $: any;

@Component({
  selector: 'years',
  templateUrl: './turn-years.component.html',
  styleUrls: ['./turn-years.component.css']
})
export class TurnYearsComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  currentPage: number = 1;
  years: Map<string, number[]>;
	months: string[] = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
	firstSemester: number[] = [0, 1, 2, 3, 4, 5];
	secondSemester: number[] = [6, 7, 8, 9, 10, 11];
	selectedYears: number[] = new Array();
	@ViewChild('pages', { read: ViewContainerRef }) pages: ViewContainerRef;

  constructor(private route: ActivatedRoute, private router: Router, private mainService: MainService, private componentFactoryResolver: ComponentFactoryResolver) {
		route.data.subscribe(data => this.years = data.years);
  }

  ngOnInit() {
	console.log('Init');
    this.route.params.subscribe((params) => {
      console.log("Decade: " + +params['page']);
      this.currentPage = +params['page'];
			let startYear = (+params['decade'] * 10) + 1900;
			this.selectedYears.length = 0;
			for(var x = 0; x < 10; x++)
				this.selectedYears.push(startYear + x);
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PagesComponent);
	    this.pages.clear();
			const pagesComponent = this.pages.createComponent(componentFactory).instance;
			pagesComponent.selectedYears = this.selectedYears;
			pagesComponent.years = this.years;
			pagesComponent.selection.subscribe(selection => this.goToPage(selection));
			this.initTurn();
    });
  }

	ngAfterViewChecked(): void {
		
	}

	ngAfterViewInit() {
//		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PagesComponent);
//    this.pages.clear();
//    const pagesComponent = this.pages.createComponent(componentFactory);
//		console.log(pagesComponent);
//		this.initTurn();
	}

	ngOnDestroy() {
		console.log('Destroying new browser');
//		$('#years').turn('destroy');
//		$('.previous, .next').remove();
	}
  
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

  goToPage(page: number) {
    $('#years').turn('page', (page + 1) * 2);
  }

	private initTurn() {
		let that = this;
		$(window).ready(function() {
			var book = document.getElementById('years');
			console.log(document.getElementById('yearWrapper').clientHeight);
			$('#years').turn({
				display: document.getElementById('yearWrapper').clientWidth < 600 ? 'single' : 'double',
				autocenter: true,
				elevation: 20,
				page: that.currentPage,
				duration: 1500,
				height: document.getElementById('yearWrapper').clientHeight,
				width: document.getElementById('yearWrapper').clientWidth
			});
			var pages = $('#years').turn('pages');
			$('#years').bind('turning', function(event, page) {
				$('#years').append('<audio autoplay><source src=\"' + environment.baseUrl + '/assets/audio/flip.mp3\" type=\"audio/mpeg\"/></audio>');
				if(page == 1) {
					$('.previous').addClass('hidden');
				} else if(page == pages || page == pages - 1) {
					$('.next').addClass('hidden')
				}
			});
			$('#years').bind('turned', function(event, page) {
				$('audio').remove();
				if(page > 1 && page < pages) {
					$('.previous').removeClass('hidden');
					$('.next').removeClass('hidden');
					that.currentPage = page;
				}
			});
					
			var previous = $('.previous');
			previous.css('height', document.getElementById('yearWrapper').clientHeight + 'px');
			if(that.currentPage == 1)
				previous.addClass('hidden');
			previous.click(function() {
				that.currentPage = that.currentPage - 1;
				$('#years').turn('previous');
			});
			var next = $('.next');
			next.css('height', document.getElementById('yearWrapper').clientHeight + 'px');
			if(that.currentPage == pages)
				next.addClass('hidden');
			next.click(function() {
				that.currentPage = that.currentPage + 1;
				$('#years').turn('next');
			});
			$('#turnBox').prepend(previous).append(next);
			window.addEventListener('resize', function(e) {
				book.style.width = '';
			  book.style.height = '';
				previous.css('height', document.getElementById('yearWrapper').clientHeight + 'px');
				next.css('height', document.getElementById('yearWrapper').clientHeight + 'px');
				if(document.getElementById('yearWrapper').clientWidth < 600)
					$(book).turn('display', 'single');
				else
					$(book).turn('display', 'double');
				$(book).turn('size', document.getElementById('yearWrapper').clientWidth, document.getElementById('yearWrapper').clientHeight);
			});
		});
	}
}
