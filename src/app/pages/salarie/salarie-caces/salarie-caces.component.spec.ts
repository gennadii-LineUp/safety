import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieCacesComponent } from './salarie-caces.component';

describe('SalarieCacesComponent', () => {
  let component: SalarieCacesComponent;
  let fixture: ComponentFixture<SalarieCacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieCacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieCacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
