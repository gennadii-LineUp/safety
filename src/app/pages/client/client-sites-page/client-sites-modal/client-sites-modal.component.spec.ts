import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSitesModalComponent } from './client-sites-modal.component';

describe('ClientSitesModalComponent', () => {
  let component: ClientSitesModalComponent;
  let fixture: ComponentFixture<ClientSitesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSitesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
