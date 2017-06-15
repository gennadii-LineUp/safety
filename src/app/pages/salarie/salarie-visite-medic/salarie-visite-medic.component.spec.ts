import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieVisiteMedicComponent } from './salarie-visite-medic.component';

describe('SalarieVisiteMedicComponent', () => {
  let component: SalarieVisiteMedicComponent;
  let fixture: ComponentFixture<SalarieVisiteMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieVisiteMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieVisiteMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
