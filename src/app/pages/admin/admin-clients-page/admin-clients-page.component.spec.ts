import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientsPageComponent } from './admin-clients-page.component';

describe('AdminClientsPageComponent', () => {
  let component: AdminClientsPageComponent;
  let fixture: ComponentFixture<AdminClientsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
