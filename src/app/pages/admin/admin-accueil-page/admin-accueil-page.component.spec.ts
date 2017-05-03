import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccueilPageComponent } from './admin-accueil-page.component';

describe('AdminAccueilPageComponent', () => {
  let component: AdminAccueilPageComponent;
  let fixture: ComponentFixture<AdminAccueilPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccueilPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccueilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
