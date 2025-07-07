import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro.html',
  standalone: false,
})
export class Cadastro implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const API_URL = 'http://localhost:5059/api/Paciente/InserePaciente';
      
      this.http.post(API_URL, this.formulario.value).subscribe({
        next: () => {
          this.snackBar.open('Paciente cadastrado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.formulario.reset();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          this.snackBar.open('Erro no cadastro. Tente novamente.', 'Fechar');
        }
      });
    }
  }
}