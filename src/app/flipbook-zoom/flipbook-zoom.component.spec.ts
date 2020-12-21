import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbookZoomComponent } from './flipbook-zoom.component';

describe('FlipbookZoomComponent', () => {
  let component: FlipbookZoomComponent;
  let fixture: ComponentFixture<FlipbookZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipbookZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipbookZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
