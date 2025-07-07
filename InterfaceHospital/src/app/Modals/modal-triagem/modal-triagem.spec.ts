import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTriagem } from './modal-triagem';

describe('ModalTriagem', () => {
  let component: ModalTriagem;
  let fixture: ComponentFixture<ModalTriagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTriagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTriagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
