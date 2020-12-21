import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbookGenericComponent } from './flipbook-generic.component';

describe('FlipbookGenericComponent', () => {
  let component: FlipbookGenericComponent;
  let fixture: ComponentFixture<FlipbookGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipbookGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipbookGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
