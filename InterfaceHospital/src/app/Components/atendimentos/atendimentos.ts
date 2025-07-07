import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { lastValueFrom, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalTriagem } from '../../Modals/modal-triagem/modal-triagem';

interface Atendimento {
  id: number;
  numeroSequencial: number;
  pacienteId: number;
  data: string;
  status: string;  
  paciente: string;    
}

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.html',
  standalone: false,
})
export class Atendimentos implements OnInit {
  displayedColumns: string[] = ['id', 'paciente', 'data', 'status'];
  dataSource!: MatTableDataSource<Atendimento>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    this.carregarAtendimentos();
  }

  async carregarAtendimentos() {
  const API_URL = 'http://localhost:5059/api/Atendimento/GetAtendimentos';
  const API_URL_PACIENTE = 'http://localhost:5059/api/Paciente/GetNomeById';

  try {
    const atendimentos = await lastValueFrom(
      this.http.get<any[]>(API_URL)
    );

    // Processa os atendimentos em paralelo
    const atendimentosFormatados = await Promise.all(
      atendimentos.map(async (item) => {
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

        return {
          id: item.id,
          numeroSequencial: item.numeroSequencial ?? 0,
          pacienteId: item.pacienteId ?? 0,
          data: item.dataHoraChegada,
          status: item.status,
          paciente: nomePaciente
        } as Atendimento;
      })
    );

    this.dataSource = new MatTableDataSource<Atendimento>(atendimentosFormatados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  } catch (error) {
    console.error('Erro ao carregar atendimentos:', error);
  }
}

  
  abrirModal(atendimento: any): void {
    this.dialog.open(ModalTriagem, {
      width: '600px',
      data: atendimento // Passa os dados do registro selecionado
    });
  }

  // Filtro (opcional)
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

function formatarData(dataApi: string): string {
  return new Date(dataApi).toLocaleDateString('pt-BR');
}