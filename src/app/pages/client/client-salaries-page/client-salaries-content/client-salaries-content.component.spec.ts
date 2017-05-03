import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSalariesContentComponent } from './client-salaries-content.component';

describe('ClientSalariesContentComponent', () => {
  let component: ClientSalariesContentComponent;
  let fixture: ComponentFixture<ClientSalariesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSalariesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSalariesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
