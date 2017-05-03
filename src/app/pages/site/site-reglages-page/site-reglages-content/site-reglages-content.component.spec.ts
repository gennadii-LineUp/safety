import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteReglagesContentComponent } from './site-reglages-content.component';

describe('SiteReglagesContentComponent', () => {
  let component: SiteReglagesContentComponent;
  let fixture: ComponentFixture<SiteReglagesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteReglagesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteReglagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
