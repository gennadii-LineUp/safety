import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSalariesComponent } from './navbar-salaries.component';

describe('NavbarSalariesComponent', () => {
  let component: NavbarSalariesComponent;
  let fixture: ComponentFixture<NavbarSalariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSalariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
