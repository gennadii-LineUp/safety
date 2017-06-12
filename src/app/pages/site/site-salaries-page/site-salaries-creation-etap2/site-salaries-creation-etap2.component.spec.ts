import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSalariesCreationEtap2Component } from './site-salaries-creation-etap2.component';

describe('SiteSalariesCreationEtap2Component', () => {
  let component: SiteSalariesCreationEtap2Component;
  let fixture: ComponentFixture<SiteSalariesCreationEtap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSalariesCreationEtap2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSalariesCreationEtap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
