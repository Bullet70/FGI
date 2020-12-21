import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecadeListComponent } from './decade-list.component';

describe('DecadeListComponent', () => {
  let component: DecadeListComponent;
  let fixture: ComponentFixture<DecadeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecadeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
