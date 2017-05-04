import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMalchanceComponent } from './login-malchance.component';

describe('LoginMalchanceComponent', () => {
  let component: LoginMalchanceComponent;
  let fixture: ComponentFixture<LoginMalchanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMalchanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMalchanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
