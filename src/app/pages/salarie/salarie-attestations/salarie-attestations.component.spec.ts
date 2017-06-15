import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieAttestationsComponent } from './salarie-attestations.component';

describe('SalarieAttestationsComponent', () => {
  let component: SalarieAttestationsComponent;
  let fixture: ComponentFixture<SalarieAttestationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieAttestationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
