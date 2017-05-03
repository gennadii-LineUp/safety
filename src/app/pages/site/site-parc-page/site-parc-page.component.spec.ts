import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParcPageComponent } from './site-parc-page.component';

describe('SiteParcPageComponent', () => {
  let component: SiteParcPageComponent;
  let fixture: ComponentFixture<SiteParcPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParcPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
