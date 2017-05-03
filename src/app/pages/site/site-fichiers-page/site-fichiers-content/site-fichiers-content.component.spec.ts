import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFichiersContentComponent } from './site-fichiers-content.component';

describe('SiteFichiersContentComponent', () => {
  let component: SiteFichiersContentComponent;
  let fixture: ComponentFixture<SiteFichiersContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFichiersContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFichiersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
