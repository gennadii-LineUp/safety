import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupesModalComponent } from './client-groupes-modal.component';

describe('ClientGroupesModalComponent', () => {
  let component: ClientGroupesModalComponent;
  let fixture: ComponentFixture<ClientGroupesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
