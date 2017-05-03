import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParcModalEnginComponent } from './site-parc-modal-engin.component';

describe('SiteParcModalEnginComponent', () => {
  let component: SiteParcModalEnginComponent;
  let fixture: ComponentFixture<SiteParcModalEnginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParcModalEnginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParcModalEnginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
