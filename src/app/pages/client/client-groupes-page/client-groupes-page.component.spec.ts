import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupesPageComponent } from './client-groupes-page.component';

describe('ClientGroupesPageComponent', () => {
  let component: ClientGroupesPageComponent;
  let fixture: ComponentFixture<ClientGroupesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
