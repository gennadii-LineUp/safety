import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSalariesPageComponent } from './client-salaries-page.component';

describe('ClientSalariesPageComponent', () => {
  let component: ClientSalariesPageComponent;
  let fixture: ComponentFixture<ClientSalariesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSalariesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSalariesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
