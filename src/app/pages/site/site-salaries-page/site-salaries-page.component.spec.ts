import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesPageComponent } from './site-salaries-page.component';

describe('SiteSalariesPageComponent', () => {
  let component: SiteSalariesPageComponent;
  let fixture: ComponentFixture<SiteSalariesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
