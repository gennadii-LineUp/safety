import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieAutorisComponent } from './salarie-autoris.component';

describe('SalarieAutorisComponent', () => {
  let component: SalarieAutorisComponent;
  let fixture: ComponentFixture<SalarieAutorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieAutorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieAutorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
