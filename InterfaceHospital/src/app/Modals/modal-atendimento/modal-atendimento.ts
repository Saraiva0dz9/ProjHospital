import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-atendimento',
  standalone: false,
  templateUrl: './modal-atendimento.html',
  styleUrl: './modal-atendimento.css'
})
export class ModalAtendimento {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<ModalAtendimento>,
      private http: HttpClient,
      private snackBar: MatSnackBar
  ) {}

  finalizarAtendimento() {
    const API_URL = `http://localhost:5059/api/Atendimento/FinalizaAtendimento/${this.data.id}`;
    
    this.http.put(API_URL, {}).subscribe({
      next: () => {
        this.snackBar.open('Atendimento finalizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.dialogRef.close({ success: true });
      },
      error: (error) => {
        console.error('Erro ao finalizar atendimento:', error);
        this.snackBar.open('Erro ao finalizar atendimento', 'Fechar');
      }
    });
  }
}
