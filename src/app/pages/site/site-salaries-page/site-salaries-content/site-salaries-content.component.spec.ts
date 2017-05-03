import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesContentComponent } from './site-salaries-content.component';

describe('SiteSalariesContentComponent', () => {
  let component: SiteSalariesContentComponent;
  let fixture: ComponentFixture<SiteSalariesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
