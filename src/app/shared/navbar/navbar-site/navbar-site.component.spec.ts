import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSiteComponent } from './navbar-site.component';

describe('NavbarSiteComponent', () => {
  let component: NavbarSiteComponent;
  let fixture: ComponentFixture<NavbarSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
