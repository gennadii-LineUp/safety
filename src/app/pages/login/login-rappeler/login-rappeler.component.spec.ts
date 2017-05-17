import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelerLeMotDePasseComponent } from './login-rappeler.component';

describe('RappelerLeMotDePasseComponent', () => {
  let component: RappelerLeMotDePasseComponent;
  let fixture: ComponentFixture<RappelerLeMotDePasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappelerLeMotDePasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappelerLeMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
