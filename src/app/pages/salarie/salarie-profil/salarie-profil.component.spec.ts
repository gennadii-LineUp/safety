import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieProfilComponent } from './salarie-profil.component';

describe('SalarieProfilComponent', () => {
  let component: SalarieProfilComponent;
  let fixture: ComponentFixture<SalarieProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarieProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarieProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
