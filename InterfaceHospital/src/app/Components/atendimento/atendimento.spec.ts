import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atendimento } from './atendimento';

describe('Atendimento', () => {
  let component: Atendimento;
  let fixture: ComponentFixture<Atendimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Atendimento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atendimento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
