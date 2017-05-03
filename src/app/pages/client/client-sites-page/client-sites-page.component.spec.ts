import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSitesPageComponent } from './client-sites-page.component';

describe('ClientSitesPageComponent', () => {
  let component: ClientSitesPageComponent;
  let fixture: ComponentFixture<ClientSitesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSitesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
