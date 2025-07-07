import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-triagem',
  standalone: false,
  templateUrl: './modal-triagem.html',
  styleUrl: './modal-triagem.css'
})
export class ModalTriagem {
triagemForm: FormGroup;
  especialidades = [
    { id: 1, nome: 'Clínica Médica' },
    { id: 2, nome: 'Pediatria' },
    { id: 3, nome: 'Cardiologia' },
    { id: 4, nome: 'Ortopedia' },
    { id: 5, nome: 'Ginecologia' },
    { id: 6, nome: 'Neurologia' },
    { id: 7, nome: 'Emergência' },
    { id: 8, nome: 'Cirurgia Geral' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.triagemForm = this.fb.group({
      paciente: [data.paciente || 'Não informado'],
      pressaoArterial: ['', Validators.required],
      peso: ['', [Validators.required, Validators.min(0)]],
      altura: ['', [Validators.required, Validators.min(0)]],
      especialidade: ['', Validators.required]
    });
  }

  salvarTriagem() {
    if (this.triagemForm.valid) {
      const formData = {
        ...this.triagemForm.value,
        atendimentoId: this.data.id
      };
      console.log('Dados da triagem:', formData);
      // Implemente a chamada à API aqui
    }
  }
}
