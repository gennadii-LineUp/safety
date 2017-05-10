import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForDeleteComponent } from './navbar-for-delete.component';

describe('NavbarForDeleteComponent', () => {
  let component: NavbarForDeleteComponent;
  let fixture: ComponentFixture<NavbarForDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarForDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarForDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
