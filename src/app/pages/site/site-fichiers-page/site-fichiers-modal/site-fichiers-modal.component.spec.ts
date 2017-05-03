import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFichiersModalComponent } from './site-fichiers-modal.component';

describe('SiteFichiersModalComponent', () => {
  let component: SiteFichiersModalComponent;
  let fixture: ComponentFixture<SiteFichiersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFichiersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFichiersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
