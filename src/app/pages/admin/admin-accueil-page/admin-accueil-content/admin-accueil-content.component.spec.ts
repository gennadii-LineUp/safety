import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccueilContentComponent } from './admin-accueil-content.component';

describe('AdminAccueilContentComponent', () => {
  let component: AdminAccueilContentComponent;
  let fixture: ComponentFixture<AdminAccueilContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccueilContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccueilContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
