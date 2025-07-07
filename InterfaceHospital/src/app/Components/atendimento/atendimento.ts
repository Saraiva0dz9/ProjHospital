import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, lastValueFrom, of } from 'rxjs';
import { ModalAtendimento } from '../../Modals/modal-atendimento/modal-atendimento';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Atendimentos {
  id: number;
  numeroSequencial: number;
  pacienteId: number;
  data: string;
  status: string;  
  paciente: string;  
  pressaoArterial: string;  
  especialidade: string;
  sintomas: string;
  peso: number;
}

@Component({
  selector: 'app-atendimento',
  standalone: false,
  templateUrl: './atendimento.html',
  styleUrl: './atendimento.css'
})
export class Atendimento implements OnInit {
  displayedColumns: string[] = ['id', 'paciente', 'data', 'pressaoArterial', 'especialidade', 'status'];
  dataSource!: MatTableDataSource<Atendimentos>;
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.carregarAtendimentos();
  }

  async carregarAtendimentos() {
    const API_URL = 'http://localhost:5059/api/Atendimento/GetAtendimentos';
    const API_URL_PACIENTE = 'http://localhost:5059/api/Paciente/GetNomeById';
    const API_URL_TRIAGEM = 'http://localhost:5059/api/Triagem/GetTriagemByAtendimentoId';

    try {
      const atendimentos = await lastValueFrom(
        this.http.get<any[]>(API_URL)
      );

      // Filtra apenas atendimentos não finalizados
      const atendimentosNaoFinalizados = atendimentos.filter(item => 
        item.status !== 'Finalizado'
      );

      // Processa os atendimentos em paralelo
      const atendimentosFormatados = await Promise.all(
        atendimentosNaoFinalizados.map(async (item) => {
          let nomePaciente = 'Desconhecido';
          
          if (item.pacienteId) {
            try {
              // Usamos responseType 'text' para evitar o parse automático como JSON
              nomePaciente = await lastValueFrom(
                this.http.get(`${API_URL_PACIENTE}/${item.pacienteId}`, { 
                  responseType: 'text' 
                })
              );
            } catch (error) {
              console.error(`Erro ao buscar paciente ${item.pacienteId}:`, error);
            }
          }

          // Buscando informações adicionais da triagem
          const triagem = await lastValueFrom(
            this.http.get<any>(`${API_URL_TRIAGEM}/${item.id}`, {
            // Adicione responseType para evitar parse automático quando houver erro
              observe: 'response' // Isso nos dá acesso completo à resposta
            }).pipe(
              catchError(error => {
                // Tratamento personalizado do erro
                if (error.status === 404) {
                  console.warn(`Triagem não encontrada para atendimento ${item.id}`);
                  return of(null); // Retorna null para casos 404
            }
            throw error; // Rejeita outros erros
          })
        )
      );

      if (triagem && triagem.body) {
        // Se encontrou a triagem
        item.pressaoArterial = triagem.body.pressaoArterial || 'N/A';
        item.especialidade = triagem.body.especialidadeId || 'N/A';
        item.sintomas = triagem.body.sintomas || 'N/A';
        item.peso = triagem.body.peso || 0;
      } else {
        // Caso 404 ou outros erros
        item.pressaoArterial = 'N/A';
        item.especialidade = 'N/A';
        item.sintomas = 'N/A';
        item.peso = 0;
      }

          return {
            id: item.id,
            numeroSequencial: item.numeroSequencial ?? 0,
            pacienteId: item.pacienteId ?? 0,
            data: item.dataHoraChegada,
            status: item.status,
            paciente: nomePaciente,
            pressaoArterial: item.pressaoArterial || 'N/A',
            especialidade: this.especialidades.find(e => e.id === item.especialidade)?.nome || 'N/A',
            sintomas: item.sintomas || 'N/A',
            peso: item.peso || 0
          } as Atendimentos;
        })
      );

      this.dataSource = new MatTableDataSource<Atendimentos>(atendimentosFormatados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    } catch (error) {
      console.error('Erro ao carregar atendimentos:', error);
    }
  } 

  abrirModalAtendimento(atendimento: Atendimentos): void {
    // Verifica se o paciente não passou pela triagem
    if (atendimento.pressaoArterial === 'N/A' || 
        atendimento.especialidade === 'N/A' ||
        atendimento.sintomas === 'N/A') {
      this.snackBar.open('Paciente ainda não passou pela triagem!', 'Fechar', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
      return; // Não abre o modal
    }

    this.dialog.open(ModalAtendimento, {
      width: '600px',
      data: atendimento
    }).afterClosed().subscribe(result => {
      if (result?.success) {
        this.carregarAtendimentos();
      }
    });
  }
}
