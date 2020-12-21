import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PinchZoomModule } from 'ngx-pinch-zoom';
import { FlipbookBookPageComponent } from './flipbook-bookpage/flipbook-bookpage.component';
import { FlipbookZoomComponent } from './flipbook-zoom/flipbook-zoom.component';
import { FlipbookGenericComponent } from './flipbook-generic/flipbook-generic.component';
import { RangePipe } from './range.pipe';
import { TimelineComponent } from './timeline/timeline.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DecadeListComponent } from './decade-list/decade-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule } from '@angular/forms';
import { BookViewerComponent } from './book-viewer/book-viewer.component';
import { TurnViewerComponent } from './turn-viewer/turn-viewer.component';
import { BrowserComponent } from './browser/browser.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home.component';
import { MainService } from './main.service';
import { Activator } from './activator.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'list/:decade/:page', component: DecadeListComponent },
    { path: 'search/:query', component: SearchPageComponent },
		{ path: 'browser/:year/:month/:page', component: BrowserComponent },
//    { path: 'browser/:year/:month/:page', component: BookViewerComponent },
//		{ path: 'book/:year/:month/:page', component: TurnViewerComponent }
//  { path: '',   redirectTo: '/list/0/0', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    FlipbookBookPageComponent,
    FlipbookZoomComponent,
    FlipbookGenericComponent,
    RangePipe,
    TimelineComponent,
    DecadeListComponent,
    SearchPageComponent,
    BookViewerComponent,
		TurnViewerComponent,
		BrowserComponent,
    SidebarComponent,
    LoginPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    PinchZoomModule,
    NgScrollbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [
  	Activator,
  	MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
