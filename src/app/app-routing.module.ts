import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { AuthComponent } from './Componentes/auth/auth.component';

const routes: Routes = [
  {
    path: 'crear', 
    component: RegistroComponent
  },
  {
    path: 'login',
    component: AuthComponent,
    // canActivate: guard para saber si está o no logeado
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
