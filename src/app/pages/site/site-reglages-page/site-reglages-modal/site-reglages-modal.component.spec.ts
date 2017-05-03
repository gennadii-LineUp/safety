import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteReglagesModalComponent } from './site-reglages-modal.component';

describe('SiteReglagesModalComponent', () => {
  let component: SiteReglagesModalComponent;
  let fixture: ComponentFixture<SiteReglagesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteReglagesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteReglagesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
