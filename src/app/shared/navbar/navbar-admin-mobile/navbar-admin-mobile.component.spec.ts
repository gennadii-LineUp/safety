import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdminMobileComponent } from './navbar-admin-mobile.component';

describe('NavbarAdminMobileComponent', () => {
  let component: NavbarAdminMobileComponent;
  let fixture: ComponentFixture<NavbarAdminMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarAdminMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAdminMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
