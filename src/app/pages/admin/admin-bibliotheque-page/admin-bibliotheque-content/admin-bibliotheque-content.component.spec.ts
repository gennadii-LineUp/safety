import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBibliothequeContentComponent } from './admin-bibliotheque-content.component';

describe('AdminBibliothequeContentComponent', () => {
  let component: AdminBibliothequeContentComponent;
  let fixture: ComponentFixture<AdminBibliothequeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBibliothequeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBibliothequeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
