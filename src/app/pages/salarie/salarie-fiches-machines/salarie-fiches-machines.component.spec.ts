import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieFichesMachinesComponent } from './salarie-fiches-machines.component';

describe('SalarieFichesMachinesComponent', () => {
  let component: SalarieFichesMachinesComponent;
  let fixture: ComponentFixture<SalarieFichesMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieFichesMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieFichesMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
