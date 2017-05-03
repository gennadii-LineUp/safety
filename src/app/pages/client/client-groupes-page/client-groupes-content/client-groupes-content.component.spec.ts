import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupesContentComponent } from './client-groupes-content.component';

describe('ClientGroupesContentComponent', () => {
  let component: ClientGroupesContentComponent;
  let fixture: ComponentFixture<ClientGroupesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupesContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
