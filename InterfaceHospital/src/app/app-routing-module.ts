import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Cadastro } from './Components/cadastro/cadastro';
import { Atendimentos } from './Components/atendimentos/atendimentos';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   loadComponent: () => import('./Components/home/home').then(m => m.Home)
  // }
  { path: 'home', component: Home },
  { path: 'cadastro', component: Cadastro },
  { path: 'atendimentos', component: Atendimentos },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota padrão
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
