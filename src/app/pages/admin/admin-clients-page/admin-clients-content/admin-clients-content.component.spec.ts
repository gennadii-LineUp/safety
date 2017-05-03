import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientsContentComponent } from './admin-clients-content.component';

describe('AdminClientsContentComponent', () => {
  let component: AdminClientsContentComponent;
  let fixture: ComponentFixture<AdminClientsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
