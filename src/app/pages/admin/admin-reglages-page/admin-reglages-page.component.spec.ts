import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReglagesPageComponent } from './admin-reglages-page.component';

describe('AdminReglagesPageComponent', () => {
  let component: AdminReglagesPageComponent;
  let fixture: ComponentFixture<AdminReglagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReglagesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReglagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
