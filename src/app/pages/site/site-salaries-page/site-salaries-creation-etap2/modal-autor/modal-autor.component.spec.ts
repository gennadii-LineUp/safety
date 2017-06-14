import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesCreationEtap2ModalAutorComponent } from './modal-autor.component';

describe('SiteSalariesCreationEtap2ModalAutorComponent', () => {
  let component: SiteSalariesCreationEtap2ModalAutorComponent;
  let fixture: ComponentFixture<SiteSalariesCreationEtap2ModalAutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesCreationEtap2ModalAutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesCreationEtap2ModalAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
