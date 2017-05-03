import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfilContentComponent } from './client-profil-content.component';

describe('ClientProfilContentComponent', () => {
  let component: ClientProfilContentComponent;
  let fixture: ComponentFixture<ClientProfilContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProfilContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfilContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
