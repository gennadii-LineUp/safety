import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBibliothequePageComponent } from './admin-bibliotheque-page.component';

describe('AdminBibliothequePageComponent', () => {
  let component: AdminBibliothequePageComponent;
  let fixture: ComponentFixture<AdminBibliothequePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBibliothequePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBibliothequePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
