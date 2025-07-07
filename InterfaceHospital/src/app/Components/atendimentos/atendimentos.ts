import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarAtendimentos();
  }

  carregarAtendimentos() {
    
    const API_URL = 'http://localhost:5059/api/Atendimento/GetAtendimentos';
    
    this.http.get<any[]>(API_URL).pipe(
      map(apiData => apiData.map(item => ({
        id: item.id,         
        numeroSequencial: item.numeroSequencial ?? 0, 
        pacienteId: item.pacienteId ?? 0,         
        data: item.dataHoraChegada,
        status: item.status                
      } as Atendimento)))
    ).subscribe({
    next: (data) => {
      this.dataSource = new MatTableDataSource<Atendimento>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    },
      error: (error) => {
        console.error('Erro ao carregar atendimentos:', error);
      }
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