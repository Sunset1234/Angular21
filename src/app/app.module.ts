import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Componentes/auth/auth.component';
import { RegistroComponent } from './Componentes/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Interceptores/authInterceptor.interceptor';
import { BarraComponent } from './barra/barra.component';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { TableroComponent } from './Componentes/tablero/tablero.component';
import { LobbyComponent } from './Componentes/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistroComponent,
    BarraComponent,
    TableroComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
