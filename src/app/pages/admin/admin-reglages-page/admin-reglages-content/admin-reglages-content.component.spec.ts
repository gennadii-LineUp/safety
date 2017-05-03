import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReglagesContentComponent } from './admin-reglages-content.component';

describe('AdminReglagesContentComponent', () => {
  let component: AdminReglagesContentComponent;
  let fixture: ComponentFixture<AdminReglagesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReglagesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReglagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
