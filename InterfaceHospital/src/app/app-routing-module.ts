import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Cadastro } from './Components/cadastro/cadastro';
import { Triagem } from './Components/triagem/triagem';
import { Atendimento } from './Components/atendimento/atendimento';

const routes: Routes = [  
  { path: 'home', component: Home },
  { path: 'cadastro', component: Cadastro },
  { path: 'triagem', component: Triagem },
  { path: 'atendimentos', component: Atendimento }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
