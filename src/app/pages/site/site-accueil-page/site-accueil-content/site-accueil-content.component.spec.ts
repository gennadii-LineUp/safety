import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAccueilContentComponent } from './site-accueil-content.component';

describe('SiteAccueilContentComponent', () => {
  let component: SiteAccueilContentComponent;
  let fixture: ComponentFixture<SiteAccueilContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAccueilContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAccueilContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
