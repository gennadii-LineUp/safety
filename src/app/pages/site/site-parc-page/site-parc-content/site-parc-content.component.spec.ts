import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParcContentComponent } from './site-parc-content.component';

describe('SiteParcContentComponent', () => {
  let component: SiteParcContentComponent;
  let fixture: ComponentFixture<SiteParcContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParcContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParcContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
