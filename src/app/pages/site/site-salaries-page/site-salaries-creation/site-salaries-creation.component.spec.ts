import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesCreationComponent } from './site-salaries-creation.component';

describe('SiteSalariesCreationComponent', () => {
  let component: SiteSalariesCreationComponent;
  let fixture: ComponentFixture<SiteSalariesCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
