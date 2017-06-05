import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStandartComponent } from './modal-standart.component';

describe('ModalStandartComponent', () => {
  let component: ModalStandartComponent;
  let fixture: ComponentFixture<ModalStandartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStandartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStandartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
