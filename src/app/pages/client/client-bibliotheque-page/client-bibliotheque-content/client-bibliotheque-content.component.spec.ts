import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBibliothequeContentComponent } from './client-bibliotheque-content.component';

describe('ClientBibliothequeContentComponent', () => {
  let component: ClientBibliothequeContentComponent;
  let fixture: ComponentFixture<ClientBibliothequeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBibliothequeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBibliothequeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
