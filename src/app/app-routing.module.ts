import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { AuthComponent } from './Componentes/auth/auth.component';
import { AuthService } from './Servicios/auth.service';
import { AuthGuard } from './Guards/auth.guard';
import { TableroComponent } from './Componentes/tablero/tablero.component';
import { LobbyComponent } from './Componentes/lobby/lobby.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { RoomGuard } from './Guards/room.guard';

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
  },
  {
    path: 'tablero',
    component:TableroComponent,
    canActivate: [AuthGuard, RoomGuard]
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component:InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
