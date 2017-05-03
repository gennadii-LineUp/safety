import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParcModalDetailsComponent } from './site-parc-modal-details.component';

describe('SiteParcModalDetailsComponent', () => {
  let component: SiteParcModalDetailsComponent;
  let fixture: ComponentFixture<SiteParcModalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParcModalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParcModalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
