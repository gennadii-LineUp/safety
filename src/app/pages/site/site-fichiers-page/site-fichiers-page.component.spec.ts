import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFichiersPageComponent } from './site-fichiers-page.component';

describe('SiteFichiersPageComponent', () => {
  let component: SiteFichiersPageComponent;
  let fixture: ComponentFixture<SiteFichiersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFichiersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFichiersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
