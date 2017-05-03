import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBibliothequePageComponent } from './client-bibliotheque-page.component';

describe('ClientBibliothequePageComponent', () => {
  let component: ClientBibliothequePageComponent;
  let fixture: ComponentFixture<ClientBibliothequePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBibliothequePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBibliothequePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
