import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAtendimento } from './modal-atendimento';

describe('ModalAtendimento', () => {
  let component: ModalAtendimento;
  let fixture: ComponentFixture<ModalAtendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAtendimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAtendimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
