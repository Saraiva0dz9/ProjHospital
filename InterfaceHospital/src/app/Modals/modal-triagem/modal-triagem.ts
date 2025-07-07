import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialogRef: MatDialogRef<ModalTriagem>,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar    
  ) 
  {
    this.triagemForm = this.fb.group({
      paciente: [data.paciente || 'Não informado'],
      PressaoArterial: ['', Validators.required],
      Peso: ['', [Validators.required, Validators.min(0)]],
      Altura: ['', [Validators.required, Validators.min(0)]],
      Sintomas: ['', Validators.required],
      EspecialidadeId: ['', Validators.required]
    });
  }

  salvarTriagem() {
    const API_URL = 'http://localhost:5059/api/Triagem/InsereTriagem';

    if (this.triagemForm.valid) {
      const formData = {        
        AtendimentoId: this.data.id,
        Sintomas: this.triagemForm.value.Sintomas,
        PressaoArterial: this.triagemForm.value.PressaoArterial,
        Peso: this.triagemForm.value.Peso,
        Altura: this.triagemForm.value.Altura,
        EspecialidadeId: this.triagemForm.value.EspecialidadeId,
      };      
      
      this.http.post(API_URL, formData).subscribe({
        next: () => {
          this.snackBar.open('Triagem salva com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.triagemForm.reset();
          this.dialogRef.close({ success: true, data: formData });
        },
        error: (erro) => {
          console.error('Erro ao salvar triagem:', erro);
          this.snackBar.open('Erro ao salvar triagem. Tente novamente.', 'Fechar');
        }
      });      
    }
  }
}
