import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteReglagesPageComponent } from './site-reglages-page.component';

describe('SiteReglagesPageComponent', () => {
  let component: SiteReglagesPageComponent;
  let fixture: ComponentFixture<SiteReglagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteReglagesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteReglagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
