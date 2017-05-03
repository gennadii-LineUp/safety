import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSitesContentComponent } from './client-sites-content.component';

describe('ClientSitesContentComponent', () => {
  let component: ClientSitesContentComponent;
  let fixture: ComponentFixture<ClientSitesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSitesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSitesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
