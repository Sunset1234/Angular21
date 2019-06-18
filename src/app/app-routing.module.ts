import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { AuthComponent } from './Componentes/auth/auth.component';
import { AuthService } from './Servicios/auth.service';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: 'crear', 
    component: RegistroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard]
    // canActivate: guard para saber si está o no logeado
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
