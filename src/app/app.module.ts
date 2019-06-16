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
import {HttpClientModule}from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegistroComponent,
    BarraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule
=======
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
>>>>>>> b4f01fcdb32a616673601b602c2f11826831c0f6
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
