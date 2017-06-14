import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesCreationEtap2ModalAttestComponent } from './modal-attest.component';

describe('SiteSalariesCreationEtap2ModalAttestComponent', () => {
  let component: SiteSalariesCreationEtap2ModalAttestComponent;
  let fixture: ComponentFixture<SiteSalariesCreationEtap2ModalAttestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesCreationEtap2ModalAttestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesCreationEtap2ModalAttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
