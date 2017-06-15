import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieFichiersComponent } from './salarie-fichiers.component';

describe('SalarieFichiersComponent', () => {
  let component: SalarieFichiersComponent;
  let fixture: ComponentFixture<SalarieFichiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieFichiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieFichiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
