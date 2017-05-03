import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAccueilPageComponent } from './site-accueil-page.component';

describe('SiteAccueilPageComponent', () => {
  let component: SiteAccueilPageComponent;
  let fixture: ComponentFixture<SiteAccueilPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAccueilPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAccueilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
