import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientAjouterComponent } from './admin-client-ajouter.component';

describe('AdminClientAjouterComponent', () => {
  let component: AdminClientAjouterComponent;
  let fixture: ComponentFixture<AdminClientAjouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClientAjouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
