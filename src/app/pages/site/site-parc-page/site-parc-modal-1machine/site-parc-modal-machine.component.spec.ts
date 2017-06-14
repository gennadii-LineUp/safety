import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteParcModalMachineComponent } from './site-parc-modal-machine.component';

describe('SiteParcModalMachineComponent', () => {
  let component: SiteParcModalMachineComponent;
  let fixture: ComponentFixture<SiteParcModalMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteParcModalMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteParcModalMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
