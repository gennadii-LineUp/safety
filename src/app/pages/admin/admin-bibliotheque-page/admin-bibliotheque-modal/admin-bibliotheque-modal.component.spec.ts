import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBibliothequeModalComponent } from './admin-bibliotheque-modal.component';

describe('AdminBibliothequeModalComponent', () => {
  let component: AdminBibliothequeModalComponent;
  let fixture: ComponentFixture<AdminBibliothequeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBibliothequeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBibliothequeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
