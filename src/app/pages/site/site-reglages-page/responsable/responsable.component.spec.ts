import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableSiteComponent } from './responsable.component';

describe('ResponsableSiteComponent', () => {
  let component: ResponsableSiteComponent;
  let fixture: ComponentFixture<ResponsableSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsableSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
