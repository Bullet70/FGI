import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbookBookPageComponent } from './flipbook-bookpage.component';

describe('FlipbookBookPageComponent', () => {
  let component: FlipbookBookPageComponent;
  let fixture: ComponentFixture<FlipbookBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipbookBookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipbookBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
