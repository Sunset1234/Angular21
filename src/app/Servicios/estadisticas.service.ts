import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  root: string = "127.0.0.1:3333/";
  estadistica: string = "estadisticas/";
  constructor(private conexion: HttpClient) { }

  partidas( id) {
    return this.conexion.get(this.root + this.estadistica + id , {responseType: 'json'});
  }

}
