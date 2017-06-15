import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieFichesModalComponent } from './salarie-fiches-modal.component';

describe('SalarieFichesModalComponent', () => {
  let component: SalarieFichesModalComponent;
  let fixture: ComponentFixture<SalarieFichesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieFichesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieFichesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
