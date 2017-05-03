import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfilPageComponent } from './client-profil-page.component';

describe('ClientProfilPageComponent', () => {
  let component: ClientProfilPageComponent;
  let fixture: ComponentFixture<ClientProfilPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProfilPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
